import React from 'react';
import {errorCodes} from './errorCodes';
import {useTranslation} from 'react-i18next';

export default function errorHandler(errorCode) {

  if (errorCode === errorCodes.EMPTY_ERROR) {
    return 'This field mustn`t be empty!';
  } else if (errorCode === errorCodes.NEGATIVE_NUMBER) {
    return 'Negative numbers and "0" (zero) are not allowed.';
  } else if (errorCode === errorCodes.CITY_IS_NOT_SERVED) {
    return 'Delivery in this city is not served yet.';
  } else if (errorCode === errorCodes.INVALID_FIRST_NAME) {
    return 'You used invalid characters in your first name!';
  } else if (errorCode === errorCodes.INVALID_LAST_NAME) {
    return 'You used invalid characters in your last name!';
  } else if (errorCode === errorCodes.INVALID_EMAIL) {
    return 'You used invalid characters in your email!';
  } else if (errorCode === errorCodes.INVALID_EMAIL_LENGTH) {
    return 'Your email length is invalid!';
  } else if (errorCode === errorCodes.EMAIL_DOES_NOT_EXIST) {
    return 'Such email doesn`t exist!';
  } else if (errorCode === errorCodes.OLD_EMAIL_DOES_NOT_MATCH) {
    return 'This email doesn`t match with your previous one!';
  } else if (errorCode === errorCodes.EMAIL_ALREADY_EXISTS) {
    return 'This email matches with your previous one!';
  } else if (errorCode === errorCodes.INVALID_TEL_NUM) {
    return 'You used invalid characters in your telephone number!';
  } else if (errorCode === errorCodes.INVALID_TEL_NUM_LENGTH) {
    return 'Your telephone number length is invalid!';
  } else if (errorCode === errorCodes.OLD_TEL_NUM_DOES_NOT_MATCH) {
    return 'Such telephone number doesn`t match with your previous one!';
  } else if (errorCode === errorCodes.TEL_NUM_ALREADY_EXISTS) {
    return 'This telephone number matches with your previous one!';
  } else if (errorCode === errorCodes.INVALID_PASSWORD) {
    return 'You used invalid characters in your password!';
  } else if (errorCode === errorCodes.INVALID_PASSWORD_LENGTH) {
    return 'Your password length is invalid!';
  } else if (errorCode === errorCodes.PASSWORDS_ARE_NOT_EQUAL) {
    return 'Password and verification doesn`t match!';
  } else if (errorCode === errorCodes.PASSWORD_NOT_ALLOWED_SYMBOLS_ERROR) {
    return 'You  used invalid.';
  } else if (errorCode === errorCodes.PASSWORD_DOES_NOT_EXIST) {
    return 'Password is incorrect!';
  } else if (errorCode === errorCodes.OLD_PASSWORD_DOES_NOT_MATCH) {
    return 'Such password doesn`t match with your previous one!';
  } else if (errorCode === errorCodes.PASSWORD_ALREADY_EXISTS) {
    return 'Such password matches with your previous one!';
  } else if (errorCode === errorCodes.INVALID_CITY_NAME) {
    return 'You used invalid characters in your city name!';
  } else if (errorCode === errorCodes.INVALID_STREET_NAME) {
    return 'You used invalid characters in your street name!';
  } else if (errorCode === errorCodes.INVALID_HOUSE_NUMBER) {
    return 'House number must contain only digits!';
  } else if (errorCode === errorCodes.INVALID_FLAT_NUMBER) {
    return 'Flat number must contain only digits!';
  } else if (errorCode === errorCodes.SESSION_EXPIRED) {
    return 'Your session expired, you must login!';
  } else if (errorCode === errorCodes.EMAIL_OR_TEL_NUM_IS_REQUIRED) {
    return 'You must enter either email or telephone number!';
  }
  return '';
}

export function handleInternalServerError(code) {
  const [t] = useTranslation();

  if (code === 500 || code === errorCodes.INVALID_REFRESH_SESSION || code === errorCodes.TOKEN_NOT_PROVIDED || code === errorCodes.REFRESH_TOKEN_NOT_PROVIDED) {
    {
      t('errorHandler.internalError')
    }
    return 'There are some issues with the server. Try again later or contact us.';
  } else if (code === 600) {
    {
      t('errorHandler.internalError')
    }
    return 'Your session has expired. You need to login.';

  }
}