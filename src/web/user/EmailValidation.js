import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { timer } from 'rxjs';
import i18n from 'i18next';
import axios from 'axios';
import { ToastContext } from '../context/toast/ToastContext';
import { logError } from '../error/errorHandler';
import { userLinks } from '../utils/restLinks';

import (/* webpackChunkName: "login", webpackPrefetch: true */ './Login');
import (/* webpackChunkName: "homepage", webpackPrefetch: true */ './Homepage');

export default function EmailValidation() {
  const location = useLocation();
  const history = useHistory();
  const { toast, setToast } = useContext(ToastContext);

  useEffect(() => {
    const pathname = location.pathname.split('/');

    validate(pathname[4], pathname[5]);
  }, []);

  function validate(email, verificationCode) {
    const data = {
      email: atob(email),
      verificationCode: verificationCode
    };

    axios.post(userLinks.validate, data)
      .then(response => {
        const { success, errors } = response.data;

        if (success && !errors) {
          setToast({
            ...toast,
            verified: true
          });
          timer(100).subscribe(() => history.push({
            pathname: `/${i18n.languages[0]}/user/login/`,
            isLoggedIn: false
          }));
        } else {
          setToast({
            ...toast,
            verified: false
          });
          timer(100).subscribe(() => history.push({
            pathname: `/${i18n.languages[0]}/`,
            isLoggedIn: false
          }));
        }
      }).catch((error) => logError(error));
  }

  return null;
}
