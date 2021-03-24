import React, {useContext, useEffect} from 'react';
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import {ToastContext} from "../context/toast/ToastContext";
import {userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";

export const EmailValidation = () => {
  const location = useLocation();
  const history = useHistory();
  const {toast, setToast} = useContext(ToastContext);

  useEffect(() => {
    const pathname = location.pathname.split('/');
    validate(pathname[3].toString('utf-8'), pathname[4]);
  }, [])

  function validate(email, verificationCode) {
    const data = {
      email: email,
      verificationCode: verificationCode
    };

    axios.post(userLinks.validate, data)
      .then(response => {
        const {success, errors} = response.data;
        if (success && !errors) {
          setToast({
            ...toast,
            verified: true
          });
          history.push({
            pathname: '/user/login/',
            isLoggedIn: false
          });
        } else {
          setToast({
            ...toast,
            verified: false
          });
          history.push({
            pathname: '/',
            isLoggedIn: false
          });
        }
      }).catch((error) => logError(error));
  }

  return null;
}