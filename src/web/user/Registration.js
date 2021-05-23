import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
import i18n from 'i18next';
import axios from 'axios';
import login from '../../assets/images/svg/login.svg';
import ConfirmButton from '../UI-components/button/ConfirmButton';
import { ModalContext } from '../context/modal/ModalContext';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Input } from '../UI-components/input/Input';
import { Animation } from '../UI-components/animation/Animation';
import { Form } from '../UI-components/form/Form';
import errorHandler from '../utils/errorHandler';
import { logError } from '../error/errorHandler';
import { userLinks } from '../utils/restLinks';
import { masks } from '../utils/inputMasks';
import Head from '../head/Head';
import './Registration.css';

import (/* webpackChunkName: "emailVal", webpackPrefetch: true */ './EmailValidation');
import (/* webpackChunkName: "login", webpackPrefetch: true */ './Login');
import (/* webpackChunkName: "homepage", webpackPrefetch: true */ './Homepage');

export default function Registration() {
  const { modal, setModal } = useContext(ModalContext);
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [ t ] = useTranslation();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telNum: '',
    password: '',
    passwordVerification: ''
  });
  const [firstNameError, setFirstnameError] = useState('');
  const [lastNameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telNumError, setTelNumError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVerificationError, setPasswordVerificationError] = useState('');

  const [telNumPrefix, setTelNumPrefix] = useState('+38');
  const [success, setSuccess] = useState(false);
  const [animate, setAnimate] = useState(false);

  async function handleRegistration() {
    setFirstnameError('');
    setLastnameError('');
    setEmailError('');
    setTelNumError('');
    setPasswordError('');
    setPasswordVerificationError('');

    let data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      telNum: telNumPrefix + user.telNum,
      password: user.password,
      passwordVerification: user.passwordVerification
    };

    await axios.post(userLinks.register, data)
      .then((response) => {
        const { success, errors } = response.data;

        if (!success && errors) {
          timer(400).subscribe(() => setAnimate(false));
          if (errors.code === 500) {
            setModal({
              ...modal, internalError: true, errorCode: 500
            });
          } else if (errors.code === 10) {
            setFirstnameError(errorHandler(errors.code));
            setLastnameError(errorHandler(errors.code));
            setEmailError(errorHandler(errors.code));
            setTelNumError(errorHandler(errors.code));
            setPasswordError(errorHandler(errors.code));
            setPasswordVerificationError(errorHandler(errors.code));
          } else {
            if (errors.firstName || errors.lastName) {
              setCurrentPage(1);
              if (errors.firstName) {
                setFirstnameError(errorHandler(errors.firstName));
              } else {
                setFirstnameError('');
              }
              if (errors.lastName) {
                setLastnameError(errorHandler(errors.lastName));
              } else {
                setLastnameError('');
              }
            }
            if (errors.email || errors.telNum) {
              setCurrentPage(2);
              if (errors.email) {
                setEmailError(errorHandler(errors.email));
              } else {
                setEmailError('');
              }
              if (errors.telNum) {
                setTelNumError(errorHandler(errors.telNum));
              } else {
                setTelNumError('');
              }
            }
            if (errors.password || errors.passwordVerification) {
              setCurrentPage(3);
              if (errors.password) {
                setPasswordError(errorHandler(errors.password));
              } else {
                setPasswordError('');
              }
              if (errors.passwordVerification) {
                setPasswordVerificationError(errorHandler(errors.passwordVerification));
              } else {
                setPasswordVerificationError('');
              }
            }
          }
        } else if (success) {
          setSuccess(true);
          setUser({ ...user, firstName: '' });
          setUser({ ...user, lastName: '' });
          setUser({ ...user, email: '' });
          setUser({ ...user, telNum: '' });
          setUser({ ...user, password: '' });
          setUser({ ...user, passwordVerification: '' });
          setModal({ ...modal, activationModal: true });
        }
      })
      .catch((error) => logError(error));
  }

  const PreviousButton = () => {
    if (currentPage !== 1) {
      return (
        <Animation onClick onHover type="bounce">
          <button
            type="button"
            className="Btn Btn-Sm Btn-S"
            onClick={() => setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1)}>
            {t('button.prev')}
          </button>
        </Animation>
      );
    }
    return null;
  };

  const NextButton = () => {
    if (currentPage < 3) {
      return (
        <Animation onClick onHover type="bounce">
          <button
            className="Btn Btn-Sm Btn-S"
            onClick={() => setCurrentPage(currentPage >= 2 ? 3 : currentPage + 1)}>
            {t('button.next')}
          </button>
        </Animation>
      );
    }
    if (currentPage === 3) {
      return (
        <ConfirmButton onClick={() => handleRegistration()} className={width < 481 ? 'Btn-Sm' : 'Btn-Sm-X-W'}
          disabled={!user.firstName
          || !user.lastName
          || !user.email
          || !user.telNum
          || !user.password
          || !user.passwordVerification}
          error={animate} text={t('signUp.button.signUp')}
        />
      );
    }
    return null;
  };

  return (
    <div className="Registration-Page Nunito Grid">
      <Head title={t('signUp.seo.title')} description={t('signUp.seo.description')}/>
      <section className="B-M Grid">
        {
          width > 768 && (
            <div className="F-C Flex J-C-C A-I-C">
              <img src={login} alt="" className="SVG"/>
            </div>
          )}
        <div className="S-C Grid">
          <header className="Header T-C Playfair F-W">
            <h1>{t('signUp.header')}</h1>
          </header>
          <Form success={success}>
            {currentPage === 1 && (
              <React.Fragment>
                <div className="Form-R Grid">
                  <Input errorIdentifier={firstNameError} labelText={t('label.firstName')}
                    errorLabelText={firstNameError}
                    inputId="firstName" inputType="text" inputName="firstName"
                    inputOnBlur={(event) => setUser({ ...user, firstName: event.target.value })}
                    inputOnChange={(event) => setUser({ ...user, firstName: event.target.value })}
                    inputRequired="required"
                    autoComplete="given-name" minLength={1} maxLength={40}
                    inputMode="latin-name"
                    tooltipId={t('tooltip.header')} tooltipText={t('tooltip.name')}
                    value={user.firstName}
                  />
                </div>
                <div className="Form-R Grid">
                  <Input errorIdentifier={lastNameError} labelText={t('label.lastName')}
                    errorLabelText={lastNameError}
                    inputId="lastName" inputType="text" inputName="lastName"
                    inputOnBlur={(event) => setUser({ ...user, lastName: event.target.value })}
                    inputOnChange={(event) => setUser({ ...user, lastName: event.target.value })}
                    inputRequired="required"
                    autoComplete="additional-name" minLength={1} maxLength={40}
                    inputMode="verbatim"
                    tooltipId={t('tooltip.header')} tooltipText={t('tooltip.name')} value={user.lastName}
                  />
                </div>
              </React.Fragment>
            )}
            {currentPage === 2 && (
              <React.Fragment>
                <div className="Form-R Grid">
                  <Input errorIdentifier={emailError} labelText={t('label.email')}
                    errorLabelText={emailError}
                    inputId="email" inputType="email" inputName="email"
                    inputOnBlur={(event) => setUser({ ...user, email: event.target.value })}
                    inputOnChange={(event) => setUser({ ...user, email: event.target.value })} inputRequired="required"
                    autoComplete="email" minLength={6} maxLength={254}
                    inputMode="email"
                    tooltipId={t('tooltip.header')} tooltipText={t('tooltip.email')} value={user.email}
                  />
                </div>
                <div className="Form-R Grid">
                  <Input errorIdentifier={telNumError} labelText={t('label.tel')}
                    errorLabelText={telNumError}
                    inputId="telNum" inputType="tel" inputName="telNum"
                    selectOnChange={(event) => setTelNumPrefix(event.target.value)} selectValue={telNumPrefix}
                    inputOnBlur={(event) => setUser({ ...user, telNum: event.target.value })}
                    inputOnChange={(event) => setUser({ ...user, telNum: event.target.value })}
                    inputRequired="required"
                    autoComplete="tel-national" inputMode="tel" mask={masks.tel}
                    tooltipId={t('tooltip.header')} tooltipText={t('tooltip.telNumOrHouseOrFlatNum')}
                    value={user.telNum} telNumPrefix={telNumPrefix}
                  />
                </div>
              </React.Fragment>
            )}
            {currentPage === 3 && (
              <React.Fragment>
                <div className="Form-R Grid">
                  <Input errorIdentifier={passwordError} labelText={t('label.password')}
                    errorLabelText={passwordError}
                    inputId="password" inputType="password" inputName="password"
                    inputOnBlur={(event) => setUser({ ...user, password: event.target.value })}
                    inputOnChange={(event) => setUser({ ...user, password: event.target.value })}
                    inputRequired="required"
                    autoComplete="new-password" minLength={8} maxLength={30}
                    inputMode="text"
                    tooltipId={t('tooltip.header')} tooltipText={t('tooltip.password')}
                    value={user.password}
                  />
                </div>
                <div className="Form-R Grid">
                  <Input errorIdentifier={passwordVerificationError} labelText={t('label.passwordVerification')}
                    errorLabelText={passwordVerificationError}
                    inputId="passwordVerification" inputType="password" inputName="passwordVerification"
                    inputOnBlur={(event) => setUser({ ...user, passwordVerification: event.target.value })}
                    inputOnChange={(event) => setUser({ ...user, passwordVerification: event.target.value })}
                    inputRequired="required"
                    autoComplete="new-password" minLength={8} maxLength={30}
                    inputMode="text"
                    tooltipId={t('tooltip.header')}
                    tooltipText={t('tooltip.passwordVerification')} value={user.passwordVerification}
                  />
                </div>
              </React.Fragment>
            )}
            <div className={'Nav-Btns Flex A-I-C ' + (currentPage === 1 ? 'J-C-C' : 'J-C-S-B')}>
              <PreviousButton/>
              <NextButton/>
            </div>
          </Form>
        </div>
      </section>
      <section className="B-B Flex J-C-C A-I-C">
        <Link to={`/${i18n.language}/user/login`} className="h6-size font-weight_300">
          {t('signUp.link.login')}
        </Link>
      </section>
    </div>
  );
}
