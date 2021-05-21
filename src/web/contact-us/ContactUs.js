import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { timer } from 'rxjs';
import axios from 'axios';
import pattern from '../../assets/images/pattern.png';
import ConfirmButton from '../UI-components/button/ConfirmButton';
import { Textarea } from '../UI-components/textarea/Textarea';
import { ModalContext } from '../context/modal/ModalContext';
import { clientLinks, userLinks } from '../utils/restLinks';
import useWindowDimensions from '../utils/isTouchDevice';
import { clientConfig } from '../utils/restApiConfigs';
import AuthContext from '../context/auth/AuthContext';
import { Input } from '../UI-components/input/Input';
import { Form } from '../UI-components/form/Form';
import { logError } from '../error/errorHandler';
import errorHandler from '../utils/errorHandler';
import Head from '../head/Head';
import './ContactUs.css';

export default function ContactUs() {
  const maxLength = 1200;
  const [contactForm, setContactForm] = useState({
    subject: 'contactUs.option.choose',
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [contactFormError, setContactFormError] = useState({
    subjectError: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    messageError: ''
  });

  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);
  const [animate, setAnimate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ t ] = useTranslation();
  const { modal, setModal } = useContext(ModalContext);
  const { width } = useWindowDimensions();
  const userContext = useContext(AuthContext);

  const phones = [
    {
      phone: '49 (045) 2478-9856',
      header: 'contactUs.label.Europe'
    },
    {
      phone: '1 (888) 234-4985',
      header: 'contactUs.label.America'
    },
    {
      phone: '852 (28) 349-810',
      header: 'contactUs.label.Asia'
    },
    {
      phone: '61 (491) 599-153',
      header: 'contactUs.label.AsiaPacific'
    }
  ];

  function _activateAnimation() {
    setAnimate(true);
    timer(600).subscribe(() => setAnimate(false));
  }

  async function handleContact() {
    let id = btoa('' + Date.now());

    let config;

    let url;

    let data = {
      appealId: id,
      subject: contactForm.subject,
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      email: contactForm.email,
      message: contactForm.message
    };

    if (userContext.logged) {
      config = {
        headers: {
          Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
          'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
            ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
          withCredentials: true
        }
      };
      url = userLinks.contactUs;
    } else {
      config = clientConfig;
      url = clientLinks.contactUs;
    }

    timer(50).subscribe(async () =>
      await axios.post(url, data, config)
        .then((response) => {
          const { success, errors } = response.data;

          if (!success && errors) {
            _activateAnimation();
            let errors = response.data.errors;

            if (errors.code === 500) {
              setModal({
                ...modal,
                internalError: true,
                errorCode: 500
              });
            } else if (errors.code === 10) {
              setContactFormError({
                ...contactFormError,
                subjectError: errorHandler(errors.code),
                firstNameError: errorHandler(errors.code),
                lastNameError: errorHandler(errors.code),
                emailError: errorHandler(errors.code),
                messageError: errorHandler(errors.code)
              });
            } else {
              if (errors.subject) {
                setContactFormError({
                  ...contactFormError,
                  subjectError: errorHandler(errors.subject)
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  subjectError: ''
                });
              }
              if (errors.firstName) {
                setContactFormError({
                  ...contactFormError,
                  firstNameError: errorHandler(errors.firstName)
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  firstNameError: ''
                });
              }
              if (errors.lastName) {
                setContactFormError({
                  ...contactFormError,
                  lastNameError: errorHandler(errors.lastName)
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  lastNameError: ''
                });
              }
              if (errors.email) {
                setContactFormError({
                  ...contactFormError,
                  emailError: errorHandler(errors.email)
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  emailError: ''
                });
              }
              if (errors.message) {
                setContactFormError({
                  ...contactFormError,
                  messageError: errorHandler(errors.message)
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  messageError: ''
                });
              }
            }
          } else {
            setSuccess(true);
            timer(400).subscribe(() => setSuccess(false));
            setContactFormError({
              ...contactFormError,
              subjectError: '',
              firstNameError: '',
              lastNameError: '',
              emailError: '',
              messageError: ''
            });
            setContactForm({
              ...contactForm,
              subject: '',
              firstName: '',
              lastName: '',
              email: '',
              message: ''
            });
            setRemainingCharacters(maxLength);
          }
        })
        .catch((error) => logError(error))
    );
  }

  const doubleRow = (
    <React.Fragment>
      <div className="Form-R Grid C-F">
        <Input errorIdentifier={contactFormError.firstNameError} labelText={t('label.firstName')}
          errorLabelText={contactFormError.firstNameError}
          inputId="firstName" inputType="text" inputName="firstName"
          inputOnBlur={(event) => setContactForm({ ...contactForm, firstName: event.target.value })}
          inputOnChange={(event) => setContactForm({ ...contactForm, firstName: event.target.value })}
          inputRequired="required"
          autoComplete="given-name"
          tooltipId={t('tooltip.header')}
          tooltipText={t('tooltip.name')}
          value={contactForm.firstName} overlayPlacement={width < 769 ? 'bottom' : 'right'}
        />
      </div>
      <div className="Form-R Grid C-S">
        <Input errorIdentifier={contactFormError.lastNameError} labelText={t('label.lastName')}
          errorLabelText={contactFormError.lastNameError}
          inputId="lastName" inputType="text" inputName="lastName"
          inputOnBlur={(event) => setContactForm({ ...contactForm, lastName: event.target.value })}
          inputOnChange={(event) => setContactForm({ ...contactForm, lastName: event.target.value })}
          inputRequired="required"
          autoComplete="family-name"
          tooltipId={t('tooltip.header')}
          tooltipText={t('tooltip.name')}
          value={contactForm.lastName} overlayPlacement={width < 769 ? 'bottom' : 'right'}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div className="Contact-Page Grid Nunito">
      <Head title={t('contactUs.seo.title')} description={t('contactUs.seo.description')}/>
      <section className="F-C Grid">
        <section className={'B-T Flex J-C-C A-I-C Playfair T-C'}>
          <header className="F-W">
            <h1>{t('contactUs.header')}</h1>
          </header>
        </section>
        <section className="B-M Flex J-C-C A-I-C F-F-C-N">
          <Form success={success}>
            <div className="Form-R Grid F-W">
              <label htmlFor="subject" className="h6-size Form-L Flex J-C-C A-I-F-S F-F-C-N">
                {t('label.subject')}
              </label>
              <Dropdown onSelect={(eventKey) => setContactForm({ ...contactForm, subject: eventKey })}>
                <Dropdown.Toggle variant={null} id="subject"
                  className="F-W Form-Sel Sel-Tel-C h6-size Btn-S tel">
                  {t(`${contactForm.subject}`)}
                </Dropdown.Toggle>
                <Dropdown.Menu className="F-W S-M Flex F-F-C-N" flip={false}>
                  <Dropdown.Item eventKey={t('contactUs.option.catering')} className="T-C">
                    {t('contactUs.option.catering')}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={t('contactUs.option.careers')} className="T-C">
                    {t('contactUs.option.careers')}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={t('contactUs.option.marketingAndPR')} className="T-C">
                    {t('contactUs.option.marketingAndPR')}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={t('contactUs.option.productInfo')} className="T-C">
                    {t('contactUs.option.productInfo')}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey={t('contactUs.option.support')} className="T-C">
                    {t('contactUs.option.support')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <p className={contactFormError.subjectError ? 'Form-L-E Italic F-W Flex' : 'None'}>
                {contactFormError.subjectError ? contactFormError.subjectError : null}
              </p>
            </div>
            {width > 480 ? (
              <div className="Form-R-D">
                {doubleRow}
              </div>
              )
              : (
                <React.Fragment>
                  {doubleRow}
                </React.Fragment>
              )}
            <div className="Form-R Grid">
              <Input errorIdentifier={contactFormError.emailError} labelText={t('label.email')}
                errorLabelText={contactFormError.emailError}
                inputId="email" inputType="email" inputName="email"
                inputOnBlur={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                inputOnChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                inputRequired="required"
                autoComplete="email"
                tooltipId={t('tooltip.header')}
                tooltipText={t('tooltip.email')}
                value={contactForm.email} overlayPlacement={width < 769 ? 'bottom' : 'right'}
              />
            </div>
            <div className="Form-Ta-R">
              <Textarea overlayPlacement="bottom" errorIdentifier={contactFormError.messageError}
                labelText={t('label.message')}
                errorLabelText={contactFormError.messageError}
                id="message" name="message"
                onBlur={(event) => {
                          setContactForm({ ...contactForm, message: event.target.value });
                          setRemainingCharacters(maxLength - event.target.value.length);
                        }}
                onChange={(event) => {
                          setContactForm({ ...contactForm, message: event.target.value });
                          setRemainingCharacters(maxLength - event.target.value.length);
                        }} inputRequired="required"
                tooltipId={t('tooltip.header')}
                tooltipText={t('tooltip.message')}
                value={contactForm.message} textareaLimit={maxLength}
              />
              <p>
                {t('remaining.characters')} {remainingCharacters}
              </p>
            </div>
          </Form>
          <ConfirmButton onClick={() => {
            handleContact();
            if (contactFormError.firstNameError
              || contactFormError.lastNameError
              || contactFormError.emailError
              || contactFormError.subjectError
              || contactFormError.messageError) {
              _activateAnimation();
            }
          }}
            disabled={!contactForm.firstName
                         || !contactForm.lastName
                         || !contactForm.email
                         || !contactForm.subject
                         || !contactForm.message}
            text={t('contactUs.button')}
            error={animate}
          />
        </section>
      </section>
      <section className="S-C Grid" style={{ background: `url(${pattern})` }}>
        <section className="B-T Flex J-C-C A-I-F-S F-F-C-N">
          <header className="T-C Flex J-C-C A-I-F-S F-F-C-N F-W F-H">
            <h2 className="h3-size">{t('contactUs.header.addresses')}</h2>
            <a href="mailto:sales@bakely.com" className="h6-size Secondary-Link">sales@bakely.com</a>
          </header>
        </section>
        <section className="B-M Grid">
          <ul className="Phones Grid">
            {phones.map((item, index) => (
              <li className="Cell Flex A-I-F-S J-C-F-S F-F-C-N" key={index}>
                <h3 className="T-L F-W h5-size">{t(item.header)}</h3>
                <a id="Europe" className="T-L PhoneNum F-W Secondary-Link" href={`tel:${item.phone}`}>
                  +{item.phone}
                </a>
              </li>
              )
            )}
          </ul>
          <section className="Locations Grid">
            <header className="F-W F-H">
              <h2 className="h3-size">{t('contactUs.header.locations')}</h2>
            </header>
            <div className="Addresses Grid">
              <div className="Cell Flex A-I-F-S J-C-F-S F-F-C-N">
                <h3 className="F-W h4-size T-L">
                  {t('contactUs.location.Kyiv.city')}
                </h3>
                <p className="h6-size F-W T-L">
                  {t('contactUs.location.Kyiv')}.
                </p>
              </div>
              <div className="Cell Flex A-I-F-S J-C-F-S F-F-C-N">
                <h3 className="F-W h4-size T-L">
                  {t('contactUs.location.Kharkov.city')}
                </h3>
                <p className="h6-size F-W T-L">
                  {t('contactUs.location.Kharkov')}.
                </p>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
