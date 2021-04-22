import React, {useContext, useState} from 'react';
import './ContactUs.css';
import axios from 'axios';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import errorHandler from "../utils/errorHandler";
import AuthContext from "../context/auth/AuthContext";
import {ModalContext} from "../context/modal/ModalContext";
import ConfirmButton from "../UI-components/button/ConfirmButton";
import {timer} from "rxjs";
import {clientConfig, userConfig} from "../utils/restApiConfigs";
import {clientLinks, userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import useWindowDimensions from "../utils/isTouchDevice";
import {Form} from "../UI-components/form/Form";
import {Textarea} from "../UI-components/textarea/Textarea";

export default function ContactUs() {
  const maxLength = 1200;
  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);
  const userContext = useContext(AuthContext);

  const [contactForm, setContactForm] = useState({
    subject: '',
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

  const [animate, setAnimate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [t] = useTranslation();
  const {modal, setModal} = useContext(ModalContext);
  const {width} = useWindowDimensions();

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
    let config, url;

    let data = {
      appealId: id,
      subject: contactForm.subject,
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      email: contactForm.email,
      message: contactForm.message
    };

    if (userContext.logged) {
      config = userConfig;
      url = userLinks.contactUs;
    } else {
      config = clientConfig;
      url = clientLinks.contactUs;
    }

    await axios.post(url, data, config)
      .then((response) => {
        const {success, errors} = response.data;
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
          timer(400).subscribe(()=>setSuccess(false));
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
      .catch((error) => logError(error));
  }

  const doubleRow =
    <React.Fragment>
      <div className='Form-Row Cell-First'>
        <Input errorIdentifier={contactFormError.firstNameError} labelText={t('label.firstName')}
               errorLabelText={contactFormError.firstNameError}
               inputId='firstName' inputType='text' inputName='firstName'
               inputOnBlur={(event) => setContactForm({...contactForm, firstName: event.target.value})}
               inputOnChange={(event) => setContactForm({...contactForm, firstName: event.target.value})}
               inputRequired='required'
               autoComplete='given-name'
               tooltipId={t('tooltip.header.firstName')}
               tooltipText={t('tooltip.name')}
               value={contactForm.firstName} overlayPlacement={width < 769 ? 'bottom' : 'right'}/>
      </div>
      <div className='Form-Row Cell-Second'>
        <Input errorIdentifier={contactFormError.lastNameError} labelText={t('label.lastName')}
               errorLabelText={contactFormError.lastNameError}
               inputId='lastName' inputType='text' inputName='lastName'
               inputOnBlur={(event) => setContactForm({...contactForm, lastName: event.target.value})}
               inputOnChange={(event) => setContactForm({...contactForm, lastName: event.target.value})}
               inputRequired='required'
               autoComplete='family-name'
               tooltipId={t('tooltip.header.lastName')}
               tooltipText={t('tooltip.name')}
               value={contactForm.lastName} overlayPlacement={width < 769 ? 'bottom' : 'right'}/>
      </div>
    </React.Fragment>;

  return (
    <div className='ContactPage Grid Nunito'>
      <section className='LeftCol Grid'>
        <section className={'TopBlock Flex J-C-C A-I-C Playfair T-C'}>
          <header className='fill-width'>
            <h1>{t('contactUs.header')}</h1>
          </header>
        </section>
        <section className='MiddleBlock Flex J-C-C A-I-C F-F-C-N'>
          <Form success={success}>
            <div className='Form-Row fill-width'>
              <label htmlFor='subject' className='h6-size Form-Label Flex J-C-C A-I-F-S F-F-C-N'>
                {t('label.subject')}
              </label>
              <select id='subject' name="subject"
                      onBlur={(event) => setContactForm({...contactForm, subject: event.target.value})}
                      onChange={(event) => setContactForm({...contactForm, subject: event.target.value})}
                      required className='fill-width Form-Select'>
                <option value={t('contactUs.option.choose')}>
                  {t('contactUs.option.choose')}
                </option>
                <option value={t('contactUs.option.catering')}>
                  {t('contactUs.option.catering')}
                </option>
                <option value={t('contactUs.option.careers')}>
                  {t('contactUs.option.careers')}
                </option>
                <option value={t('contactUs.option.marketingAndPR')}>
                  {t('contactUs.option.marketingAndPR')}
                </option>
                <option value={t('contactUs.option.productInfo')}>
                  {t('contactUs.option.productInfo')}
                </option>
                <option value={t('contactUs.option.support')}>
                  {t('contactUs.option.support')}
                </option>
              </select>
              <p
                className={contactFormError.subjectError ? 'Form-Label-Error fill-width Flex' : 'none'}>{contactFormError.subjectError ? contactFormError.subjectError : null}</p>
            </div>
            {width > 480 ?
              <div className='Form-Row-Double'>
                {doubleRow}
              </div>
              : <React.Fragment>
                {doubleRow}
              </React.Fragment>}
            <div className='Form-Row'>
              <Input errorIdentifier={contactFormError.emailError} labelText={t('label.email')}
                     errorLabelText={contactFormError.emailError}
                     inputId='email' inputType='email' inputName='email'
                     inputOnBlur={(event) => setContactForm({...contactForm, email: event.target.value})}
                     inputOnChange={(event) => setContactForm({...contactForm, email: event.target.value})}
                     inputRequired='required'
                     autoComplete='email'
                     tooltipId={t('tooltip.header.email')}
                     tooltipText={t('tooltip.email')}
                     value={contactForm.email} overlayPlacement={width < 769 ? 'bottom' : 'right'}/>
            </div>
            <div className='Form-TextareaRow'>
              <Textarea overlayPlacement='bottom' errorIdentifier={contactFormError.messageError}
                        labelText={t('label.message')}
                        errorLabelText={contactFormError.messageError}
                        id='message' name='message'
                        onBlur={(event) => {
                          setContactForm({...contactForm, message: event.target.value})
                          setRemainingCharacters(maxLength - event.target.value.length);
                        }}
                        onChange={(event) => {
                          setContactForm({...contactForm, message: event.target.value});
                          setRemainingCharacters(maxLength - event.target.value.length);
                        }} inputRequired='required'
                        tooltipId={t('tooltip.header.message')}
                        tooltipText={t('tooltip.message')}
                        value={contactForm.message} textareaLimit={maxLength}/>
              <p>
                {t('contactUs.characters')} {remainingCharacters}
              </p>
            </div>
          </Form>
          <ConfirmButton onClick={() => {
            handleContact();
            if (contactFormError.firstNameError || contactFormError.lastNameError || contactFormError.emailError || contactFormError.subjectError || contactFormError.messageError) {
              _activateAnimation();
            }
          }}
                         disabled={!contactForm.firstName || !contactForm.lastName || !contactForm.email || !contactForm.subject || !contactForm.message}
                         text={t('contactUs.button')}
                         error={animate}/>
        </section>
      </section>
      <section className='RightCol Grid'>
        <section className='TopBlock Flex J-C-C A-I-F-S F-F-C-N'>
          <header className='T-C Flex J-C-C A-I-F-S F-F-C-N fill-width fill-height'>
            <h2 className='h3-size'>{t('contactUs.header.addresses')}</h2>
            <a href='mailto:sales@bakely.com' className='h6-size Secondary-Link'>sales@bakely.com</a>
          </header>
        </section>
        <section className='MiddleBlock Grid'>
          <ul className='Phones Grid'>
            {phones.map((item, index) =>
              <li className='Cell Flex A-I-F-S J-C-F-S F-F-C-N' key={index}>
                <h3 className='T-L fill-width h5-size'>{t(item.header)}</h3>
                <a id='Europe' className='T-L PhoneNum fill-width Secondary-Link' href={`tel:${item.phone}`}>
                  +{item.phone}
                </a>
              </li>
            )}
          </ul>
          <section className='Locations Grid'>
            <header className='fill-width fill-height'>
              <h2 className='h3-size'>{t('contactUs.header.locations')}</h2>
            </header>
            <div className='Addresses Grid'>
              <div className='Cell Flex A-I-F-S J-C-F-S F-F-C-N'>
                <h3 className='fill-width h4-size T-L'>
                  {t('contactUs.location.Kyiv.city')}
                </h3>
                <p className='h6-size fill-width T-L'>
                  {t('contactUs.location.Kyiv')}.
                </p>
              </div>
              <div className='Cell Flex A-I-F-S J-C-F-S F-F-C-N'>
                <h3 className='fill-width h4-size T-L'>
                  {t('contactUs.location.Kharkov.city')}
                </h3>
                <p className='h6-size fill-width T-L'>
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