import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
import i18n from 'i18next';
import axios from 'axios';
import ConfirmButton from '../UI-components/button/ConfirmButton';
import { ModalContext } from '../context/modal/ModalContext';
import useWindowDimensions from '../utils/useWindowDimensions';
import login from '../../assets/images/svg/login.svg';
import AuthContext from '../context/auth/AuthContext';
import { Input } from '../UI-components/input/Input';
import { Form } from '../UI-components/form/Form';
import errorHandler from '../utils/errorHandler';
import { logError } from '../error/errorHandler';
import { userLinks } from '../utils/restLinks';
import '../UI-components/form/Form.css';
import Head from '../head/Head';
import './Login.css';

import (/* webpackChunkName: "homepage", webpackPrefetch: true */ './Homepage');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [animate, setAnimate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ t ] = useTranslation();

  const { width } = useWindowDimensions();
  const { modal, setModal } = useContext(ModalContext);
  const history = useHistory();
  const authContext = useContext(AuthContext);
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
      }, {
        headers: {
          'Client-Token': localStorage.getItem(btoa('clientsToken'))
            ? atob(localStorage.getItem(btoa('clientsToken'))) : null,
          withCredentials: true
        }
      })
      .then((response) => {
        const { success, errors, body } = response.data;

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
          } else if (errors.code === 40) {
            setModal({
              ...modal,
              notActivated: true
            });
          } else if (errors.code === 50) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: 50
            });
          } else {
            if (errors.email) {
              setEmailError(errorHandler(errors.email));
            } else {
              setEmailError('');
            }
            if (errors.password) {
              setPasswordError(errorHandler(errors.password));
            } else {
              setPasswordError('');
            }
          }
        } else if (success) {
          if (typeof window !== 'undefined') {
            setEmailError('');
            setPasswordError('');

            setSuccess(true);

            localStorage.setItem(btoa('token'), btoa(JSON.stringify(body[0].token)));
            localStorage.setItem(btoa('refreshToken'), btoa(JSON.stringify(body[1].refreshToken)));
            localStorage.setItem(btoa('refreshTime'), btoa(JSON.stringify({
              now: Date.now(),
              expires: Date.now() + 840000
            })));
            authContext.loadDeliveryAddresses();

            timer(500).subscribe(() => {
              authContext.login();
              if (location.pathname === `/${i18n.languages[0]}/user/login`) {
                history.push({
                  pathname: `/${i18n.languages[0]}/user/homepage`,
                  isLoggedIn: true
                });
              }
            });
          }
        }
      })
      .catch((error) => logError(error));
  }

  return (
    <div className="Login-Page Nunito Grid">
      <Head title={t('login.seo.title')} description={t('login.seo.description')}/>
      <section className="B-M Grid">
        {
          width > 768 && (
            <div className="F-C Flex J-C-C A-I-C">
              <img src={login} alt="" className="SVG"/>
            </div>
          )}
        <div className="S-C Grid">
          <header className="Lo-H T-C Playfair">
            <h1>{t('login.header')}</h1>
          </header>
          <Form success={success}>
            <div className="Form-R Grid">
              <Input errorIdentifier={emailError} labelText={t('label.email')} errorLabelText={emailError}
                inputId="email" inputType="email" inputName="email"
                minLength={6} maxLength={254} inputMode="email"
                inputOnBlur={(event) => setEmail(event.target.value)}
                inputOnChange={(event) => setEmail(event.target.value)} inputRequired="required"
                autoComplete="email"
                tooltipId={t('tooltip.header')} tooltipText={t('tooltip.email')} value={email}
              />
            </div>
            <div className="Form-R Grid">
              <Input errorIdentifier={passwordError} labelText={t('label.password')}
                errorLabelText={passwordError}
                inputId="password" inputType="password" inputName="password"
                inputOnBlur={(event) => setPassword(event.target.value)} minLength={8} maxLength={30}
                inputMode="verbatim"
                inputOnChange={(event) => setPassword(event.target.value)} inputRequired="required"
                autoComplete="current-password" tooltipId={t('tooltip.header')}
                tooltipText={t('tooltip.password')}
                value={password}
              />
            </div>
            <div className="Form-B">
              <ConfirmButton onClick={() => handleLogin()} disabled={!email || !password}
                text={t('login.button')} error={animate}
              />
            </div>
          </Form>
        </div>
      </section>
      <section className="B-B Flex J-C-C A-I-C">
        <Link to={`/${i18n.languages[0]}/user/registration`} className="h6-size font-weight_300">
          {t('login.link.signUp')}
        </Link>
      </section>
    </div>
  );
}
