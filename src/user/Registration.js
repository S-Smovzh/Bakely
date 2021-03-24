import React, {useContext, useState} from 'react';
import './Registration.css';
import './../UI-components/form/Form.css';
import axios from 'axios';
import {Picture} from '../UI-components/picture/Picture';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import errorHandler from '../utils/errorHandler';
import {ModalContext} from "../context/modal/ModalContext";
import {masks} from "../utils/inputMasks";
import {Form} from "../UI-components/form/Form";
import ConfirmButton from "../UI-components/button/ConfirmButton";
import {Link, useHistory} from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import {timer} from "rxjs";
import {userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import {Animation} from "../animation/Animation";

export default function Registration() {
  const {modal, setModal} = useContext(ModalContext);
  const history = useHistory();
  const context = useContext(AuthContext);

  const [animate, setAnimate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [t] = useTranslation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telNum, setTelNum] = useState('');
  const [telNumPrefix, setTelNumPrefix] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telNumError, setTelNumError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVerificationError, setPasswordVerificationError] = useState('');

  function _activateAnimation() {
    setAnimate(true);
    timer(600).subscribe(() => setAnimate(false));
  }

  async function handleRegistration() {
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setTelNumError(null);
    setPasswordError(null);
    setPasswordVerificationError(null);
    setAnimate(false);

    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      telNum: telNumPrefix + telNum,
      password: password,
      passwordVerification: passwordVerification
    };

    await axios.post(userLinks.register, data)
      .then((response) => {
        const {success, errors} = response.data;
        if (!success && errors) {
          _activateAnimation();
          if (errors.code === 500) {
            setModal({
              ...modal, internalError: true, errorCode: 500
            })
          } else if (errors.code === 10) {
            setFirstNameError(errorHandler(errors.code));
            setLastNameError(errorHandler(errors.code));
            setEmailError(errorHandler(errors.code));
            setTelNumError(errorHandler(errors.code));
            setPasswordError(errorHandler(errors.code));
            setPasswordVerificationError(errorHandler(errors.code));
          } else {
            if (errors.firstName || errors.lastName) {
              setCurrentPage(1);
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
            }
            if (errors.email || errors.telNum) {
              setCurrentPage(2);
              if (errors.email) {
                setEmailError(errorHandler(errors.email));
              } else {
                setEmailError(null);
              }
              if (errors.telNum) {
                setTelNumError(errorHandler(errors.telNum));
              } else {
                setTelNumError(null);
              }
            }
            if (errors.password || errors.passwordVerification) {
              setCurrentPage(3);
              if (errors.password) {
                setPasswordError(errorHandler(errors.password));
              } else {
                setPasswordError(null);
              }
              if (errors.passwordVerification) {
                setPasswordVerificationError(errorHandler(errors.passwordVerification));
              } else {
                setPasswordVerificationError(null);
              }
            }
          }
        } else if (success) {
          context.saveName(`${firstName} ${lastName}`)
          setSuccess(true);
          setFirstName('');
          setLastName('');
          setEmail('');
          setTelNum('');
          setPassword('');
          setPasswordVerification('');
          setFirstNameError(null);
          setLastNameError(null);
          setEmailError(null);
          setTelNumError(null);
          setPasswordError(null);
          setPasswordVerificationError(null);
          timer(600).subscribe(() => {
            history.push({
              pathname: '/user/login',
              isLoggedIn: false
            });
          });
        }
      })
      .catch((error) => logError(error));
  }

  function _next() {
    setCurrentPage(currentPage >= 2 ? 3 : currentPage + 1);
  }

  function _prev() {
    setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
  }

  const PreviousButton = () => {
    if (currentPage !== 1) {
      return (
        <Animation onClick={true} onHover={true} type='bounce'>
          <button
            type='button'
            className='button button-small button-secondary'
            onClick={() => _prev()}>
            {t('button.prev')}
          </button>
        </Animation>
      );
    }
    return null;
  }

  const NextButton = () => {
    if (currentPage < 3) {
      return (
        <Animation onClick={true} onHover={true} type='bounce'>
          <button
            className='button button-small button-secondary'
            onClick={() => _next()}>
            {t('button.next')}
          </button>
        </Animation>
      );
    }
    if (currentPage === 3) {
      return (
        <ConfirmButton onClick={() => handleRegistration()}
                       disabled={!firstName || !lastName || !email || !telNum || !password || !passwordVerification}
                       error={animate} className='button-small-x-wide'
                       type='button' text={t('signUp.button.signUp')}/>
      );
    }
    return null;
  }

  return (
    <div className='Registration-Page Nunito'>
      <section className='MiddleBlock'>
        <div className='LeftRow'>
          <Picture src='http://localhost:3000/img/svg/login.svg' alt='Login picture' className='Login-Picture'
                   imgClassName='SVG-Image'/>
        </div>
        <div className='RightRow'>
          <header className='Login-Header Playfair fill-width'>
            <h1>{t('signUp.header')}</h1>
          </header>
          <Form success={success}>
            {currentPage === 1 &&
            <React.Fragment>
              <div className='Form-Row'>
                <Input errorIdentifier={firstNameError} labelText={t('label.firstName')}
                       errorLabelText={firstNameError}
                       inputId='firstName' inputType='text' inputName='firstName'
                       inputOnBlur={(event) => setFirstName(event.target.value)}
                       inputOnChange={(event) => setFirstName(event.target.value)} inputRequired='required'
                       autoComplete='off' minLength={1} maxLength={40} inputMode='latin-name'
                       tooltipId={t('tooltip.header.firstName')} tooltipText={t('tooltip.name')}
                       value={firstName}/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={lastNameError} labelText={t('label.lastName')}
                       errorLabelText={lastNameError}
                       inputId='lastName' inputType='text' inputName='lastName'
                       inputOnBlur={(event) => setLastName(event.target.value)}
                       inputOnChange={(event) => setLastName(event.target.value)} inputRequired='required'
                       autoComplete='off' minLength={1} maxLength={40} inputMode='verbatim'
                       tooltipId={t('tooltip.header.lastName')} tooltipText={t('tooltip.name')} value={lastName}/>
              </div>
            </React.Fragment>}
            {currentPage === 2 &&
            <React.Fragment>
              <div className='Form-Row'>
                <Input errorIdentifier={emailError} labelText={t('label.email')} errorLabelText={emailError}
                       inputId='email' inputType='email' inputName='email'
                       inputOnBlur={(event) => setEmail(event.target.value)}
                       inputOnChange={(event) => setEmail(event.target.value)} inputRequired='required'
                       autoComplete='off' minLength={6} maxLength={254} inputMode='email'
                       tooltipId={t('tooltip.header.email')} tooltipText={t('tooltip.email')} value={email}/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={telNumError} labelText={t('label.tel')} errorLabelText={telNumError}
                       inputId='telNum' inputType='tel' inputName='telNum'
                       selectOnChange={(event) => setTelNumPrefix(event.target.value)} selectValue={telNumPrefix}
                       inputOnBlur={(event) => setTelNum(event.target.value)}
                       inputOnChange={(event) => setTelNum(event.target.value)} inputRequired='required'
                       autoComplete='off' inputMode='tel' mask={masks.tel}
                       tooltipId={t('tooltip.header.tel')} tooltipText={t('tooltip.telNumOrHouseOrFlatNum')}
                       value={telNum}/>
              </div>
            </React.Fragment>}
            {currentPage === 3 &&
            <React.Fragment>
              <div className='Form-Row'>
                <Input errorIdentifier={passwordError} labelText={t('label.password')}
                       errorLabelText={passwordError}
                       inputId='password' inputType='password' inputName='password'
                       inputOnBlur={(event) => setPassword(event.target.value)}
                       inputOnChange={(event) => setPassword(event.target.value)} inputRequired='required'
                       autoComplete='off' minLength={8} maxLength={30} inputMode='verbatim'
                       tooltipId={t('tooltip.header.password')} tooltipText={t('tooltip.password')} value={password}/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={passwordVerificationError} labelText={t('label.passwordVerification')}
                       errorLabelText={passwordVerificationError}
                       inputId='passwordVerification' inputType='password' inputName='passwordVerification'
                       inputOnBlur={(event) => setPasswordVerification(event.target.value)}
                       inputOnChange={(event) => setPasswordVerification(event.target.value)} inputRequired='required'
                       autoComplete='off' minLength={8} maxLength={30} inputMode='verbatim'
                       tooltipId={t('tooltip.header.passwordVerification')}
                       tooltipText={t('tooltip.passwordVerification')} value={passwordVerification}/>
              </div>
            </React.Fragment>}
            <div className={'NavigationButtons ' + (currentPage === 1 ? 'One' : 'Two')}>
              <PreviousButton/>
              <NextButton/>
            </div>
          </Form>
        </div>
      </section>
      <section className='BottomBlock'>
        <Link to='/user/registration' className='h4-size font-weight_300'>
          {t('signUp.link')}
        </Link>
      </section>
    </div>
  );
}