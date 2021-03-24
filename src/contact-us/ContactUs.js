import React, {useContext, useState} from 'react';
import './ContactUs.css';
import axios from 'axios';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import errorHandler from "../utils/errorHandler";
import {Form} from "../UI-components/form/Form";
import AuthContext from "../context/auth/AuthContext";
import {ModalContext} from "../context/modal/ModalContext";
import ConfirmButton from "../UI-components/button/ConfirmButton";
import {timer} from "rxjs";
import {clientConfig, userConfig} from "../utils/restApiConfigs";
import {clientLinks, userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";

export default function ContactUs() {
  const maxLength = 1200;
  const [remainingCharacters, setRemainingCharacters] = useState(1200);
  const userContext = useContext(AuthContext);

  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const [animate, setAnimate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [t] = useTranslation();
  const {modal, setModal} = useContext(ModalContext);

  function _activateAnimation() {
    setAnimate(true);
    timer(600).subscribe(() => setAnimate(false));
  }

  async function handleContact() {
    let id = btoa('' + Date.now());
    let config, url;

    let data = {
      appealId: id,
      subject: subject,
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message
    };

    if (userContext.logged) {
      config = userConfig;
      url = userLinks.contactUs;
    } else {
      config = clientConfig;
      url = clientLinks.contactUs;
    }

    await axios.post(url, data, config)
      .then(function (response) {
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
            setSubjectError(errorHandler(errors.code));
            setFirstNameError(errorHandler(errors.code));
            setLastNameError(errorHandler(errors.code));
            setEmailError(errorHandler(errors.code));
            setMessageError(errorHandler(errors.code));
          } else {
            if (errors.subject) {
              setSubjectError(errorHandler(errors.subject));
            } else {
              setSubjectError(null);
            }
            if (errors.firstName) {
              setFirstNameError(errorHandler(errors.firstName));
            } else {
              setFirstNameError(null);
            }
            if (errors.lastName) {
              setLastNameError(errorHandler(errors.lastName));
            } else {
              setLastNameError(null);
            }
            if (errors.email) {
              setEmailError(errorHandler(errors.email));
            } else {
              setEmailError(null);
            }
            if (errors.message) {
              setMessageError(errorHandler(errors.message));
            } else {
              setMessageError(null);
            }
          }
        } else {
          setSuccess(true);
          setSubjectError(null);
          setFirstNameError(null);
          setLastNameError(null);
          setEmailError(null);
          setMessageError(null);
          setSubject('');
          setFirstName('');
          setLastName('');
          setEmail('');
          setMessage('');
        }
      })
      .catch((error) => logError(error));
  }

  return (
    <div className='ContactPage Nunito'>
      <section className='LeftCol'>
        <section className='TopBlock Playfair'>
          <header className='fill-width fill-height'>
            <h1>{t('contactUs.header')}</h1>
          </header>
        </section>
        <section className='MiddleBlock'>
          <Form success={success}>
            <div className='Form-Row'>
              <label htmlFor='subject'>
                {t('label.subject')}
              </label>
              <select id='subject' name="subject"
                      onBlur={(event) => setSubject(event.target.value)}
                      onChange={(event) => setSubject(event.target.value)}
                      required>
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
                className={subjectError ? 'Form-Label-Error fill-width flex' : 'none'}>{subjectError ? subjectError : null}</p>
            </div>
            <div className='Form-Row-Double'>
              <div className='Form-Row Cell-First'>
                <Input errorIdentifier={firstNameError} labelText={t('label.firstName')}
                       errorLabelText={firstNameError}
                       inputId='firstName' inputType='text' inputName='firstName'
                       inputOnBlur={(event) => setFirstName(event.target.value)}
                       inputOnChange={(event) => setFirstName(event.target.value)} inputRequired='required'
                       autoComplete='off'
                       tooltipId={t('tooltip.header.firstName')}
                       tooltipText={t('tooltip.name')}
                       value={firstName}/>
              </div>
              <div className='Form-Row Cell-Second'>
                <Input errorIdentifier={lastNameError} labelText={t('label.lastName')}
                       errorLabelText={lastNameError}
                       inputId='lastName' inputType='text' inputName='lastName'
                       inputOnBlur={(event) => setLastName(event.target.value)}
                       inputOnChange={(event) => setLastName(event.target.value)} inputRequired='required'
                       autoComplete='on'
                       tooltipId={t('tooltip.header.lastName')}
                       tooltipText={t('tooltip.name')}
                       value={lastName}/>
              </div>
            </div>
            <div className='Form-Row'>
              <Input errorIdentifier={emailError} labelText={t('label.email')} errorLabelText={emailError}
                     inputId='email' inputType='email' inputName='email'
                     inputOnBlur={(event) => setEmail(event.target.value)}
                     inputOnChange={(event) => setEmail(event.target.value)} inputRequired='required'
                     autoComplete='on'
                     tooltipId={t('tooltip.header.email')}
                     tooltipText={t('tooltip.email')}
                     value={email}/>
            </div>
            <div className='Form-TextareaRow'>
              <Input errorIdentifier={messageError} labelText={t('label.message')}
                     errorLabelText={messageError}
                     inputId='message' inputType='textarea' inputName='message'
                     inputOnBlur={(event) => {
                       setMessage(event.target.value)
                       setRemainingCharacters(maxLength - event.target.value.length);
                     }}
                     inputOnChange={(event) => {
                       setMessage(event.target.value)
                       setRemainingCharacters(maxLength - event.target.value.length);
                     }} inputRequired='required' autoComplete='on'
                     tooltipId={t('tooltip.header.message')}
                     tooltipText={t('tooltip.message')}
                     value={message} textareaLimit={maxLength}/>
              <p>
                {t('contactUs.characters')} {remainingCharacters}
              </p>
            </div>
          </Form>
          <ConfirmButton onClick={() => {
            handleContact();
            if (firstNameError || lastNameError || emailError || subjectError || messageError) {
              _activateAnimation();
            }
          }} disabled={!firstName || !lastName || !email || !subject || !message} text={t('contactUs.button')} error={animate}/>
        </section>
      </section>

      <div className='RightCol'>
        <section className='TopBlock'>
          <header className='fill-width fill-height'>
            <h2 className='h3-size'>{t('contactUs.header.addresses')}</h2>
            <a href='mailto:sales@bakely.com' className='h6-size Secondary-Link'>sales@bakely.com</a>
          </header>
        </section>
        <section className='MiddleBlock'>
          <section className='Phones'>
            <div className='Cell'>
              <h3 className='fill-width h5-size'>{t('contactUs.label.Europe')}</h3>
              <a id='Europe' className='PhoneNum fill-width Secondary-Link' href={'tel:49 (045) 2478-9856'}>
                +49 (045) 2478-9856
              </a>
            </div>
            <div className='Cell'>
              <h3 className='fill-width h5-size'>{t('contactUs.label.America')}</h3>
              <a className='PhoneNum fill-width Secondary-Link' href='tel:1 (888) 234 4985'>
                +1 (888) 234-4985
              </a>
            </div>
            <div className='Cell'>
              <h3 className='fill-width h5-size'>{t('contactUs.label.Asia')}</h3>
              <a className='PhoneNum fill-width Secondary-Link' href='tel:852 (28) 349-810'>
                +852 (28) 349-810
              </a>
            </div>
            <div className='Cell'>
              <h3 className='fill-width h5-size'>{t('contactUs.label.AsiaPacific')}</h3>
              <a className='PhoneNum fill-width Secondary-Link' href='tel:61 (491) 599-153'>
                +61 (491) 599-153
              </a>
            </div>
          </section>
          <section className='Locations'>
            <header className='fill-width fill-height'>
              <h2 className='h3-size'>{t('contactUs.header.locations')}</h2>
            </header>
            <div className='Addresses'>
              <div className='Cell'>
                <h3 className='fill-width h4-size'>
                  {t('contactUs.location.Kyiv.city')}
                </h3>
                <p className='fill-width'>
                  {t('contactUs.location.Kyiv')}.
                </p>
              </div>
              <div className='Cell'>
                <h3 className='fill-width h4-size'>
                  {t('contactUs.location.Kharkov.city')}
                </h3>
                <p className='fill-width'>
                  {t('contactUs.location.Kharkov')}.
                </p>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}