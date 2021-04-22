import React, {useContext, useState} from 'react';
import './Login.css';
import './../UI-components/form/Form.css';
import axios from 'axios';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import errorHandler from '../utils/errorHandler';
import {ModalContext} from '../context/modal/ModalContext';
import AuthContext from '../context/auth/AuthContext';
import {Form} from "../UI-components/form/Form";
import ConfirmButton from "../UI-components/button/ConfirmButton";
import useWindowDimensions from "../utils/isTouchDevice";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {userLinks} from "../utils/restLinks";
import {userConfig} from "../utils/restApiConfigs";
import {timer} from "rxjs";
import {logError} from "../error/errorHandler";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [animate, setAnimate] = useState(false);
  const [success, setSuccess] = useState(false);

  const [t] = useTranslation();

  const {width} = useWindowDimensions();
  const {modal, setModal} = useContext(ModalContext);
  const history = useHistory();
  const context = useContext(AuthContext);
  const location = useLocation();

  async function handleLogin() {
    setEmailError('');
    setPasswordError('');

      const fp = await FingerprintJS.load();
      const result = await fp.get();

      await axios.post(userLinks.login,
        {
          email: email,
          password: password,
          fingerprint: result.visitorId
        }, userConfig)
        .then((response) => {
          const {success, errors, body} = response.data;
          if (!success && errors) {
            setAnimate(true);
            timer(400).subscribe(() => setAnimate(false));
            if (errors.code === 500) {
              setModal({
                ...modal,
                internalError: true,
                errorCode: 500
              });
            } else if (errors.code === 10) {
              setEmailError(errorHandler(errors.code));
              setPasswordError(errorHandler(errors.code));
            } else if (errors.code === 50) {
              console.log('too many tries') //TODO
            } else {
              if (errors.email) {
                const a = errorHandler(errors.email);

                console.log(a, 'jjh')

                setEmailError(()=>errorHandler(errors.email));
              } else {
                setEmailError(null);
              }
              if (errors.password) {
                setPasswordError(errorHandler(errors.password));
              } else {
                setPasswordError(null);
              }
            }
          } else if (success) {
            setEmailError('');
            setPasswordError('');

            setSuccess(true);
            localStorage.setItem('token', JSON.stringify(body[0].token));
            localStorage.setItem('refreshToken', JSON.stringify(body[1].refreshToken));
            context.login();
            context.loadDeliveryAddresses();
            localStorage.setItem('refreshTime', JSON.stringify({now: Date.now(), expires: Date.now() + 40000}));

            timer(600).subscribe(() => {
              if (location.pathname === '/user/login') {
                history.push({
                  pathname: '/user/homepage',
                  isLoggedIn: true
                });
              }
            });
          }
        })
        .catch((error) => logError(error));
  }

  return (
    <div className='Login-Page Nunito Grid'>
      <section className='MiddleBlock Grid'>
        {
          width > 768 &&
          <div className='LeftRow Flex J-C-C A-I-C'>
            <img src='http://localhost:3000/img/svg/login.svg' alt='' className='SVG-Image'/>
          </div>
        }
        <div className='RightRow Grid'>
          <header className='Login-Header T-C Playfair'>
            <h1>{t('login.header')}</h1>
          </header>
          <Form success={success}>
            <div className='Form-Row'>
              <Input errorIdentifier={emailError} labelText={t('label.email')} errorLabelText={emailError}
                     inputId='email' inputType='email' inputName='email' minLength={6} maxLength={254} inputMode='email'
                     inputOnBlur={(event) => setEmail(event.target.value)}
                     inputOnChange={(event) => setEmail(event.target.value)} inputRequired='required'
                     autoComplete='email'
                     tooltipId={t('label.header.email')} tooltipText={t('tooltip.email')} value={email}/>
            </div>
            <div className='Form-Row'>
              <Input errorIdentifier={passwordError} labelText={t('label.password')}
                     errorLabelText={passwordError}
                     inputId='password' inputType='password' inputName='password'
                     inputOnBlur={(event) => setPassword(event.target.value)} minLength={8} maxLength={30}
                     inputMode='verbatim'
                     inputOnChange={(event) => setPassword(event.target.value)} inputRequired='required'
                     autoComplete='current-password' tooltipId={t('label.header.password')}
                     tooltipText={t('tooltip.password')}
                     value={password}/>
            </div>
            <div className='Form-Button'>
              <ConfirmButton onClick={() => handleLogin()} disabled={!email || !password}
                             text={t('login.button')} error={animate}/>
            </div>
          </Form>
        </div>
      </section>
      <section className='BottomBlock Flex J-C-C A-I-C'>
        <Link to='/user/registration' className='h6-size font-weight_300'>
          {t('signUp.link')}
        </Link>
      </section>
    </div>
  );
}
