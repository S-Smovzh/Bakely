import i18n from 'i18next';
import { errorCodes } from './errorCodes';

// eslint-disable-next-line complexity
export default function errorHandler(errorCode) {
  if (errorCode === errorCodes.INVALID_FIRST_NAME ||
    errorCode === errorCodes.INVALID_LAST_NAME ||
    errorCode === errorCodes.INVALID_EMAIL ||
    errorCode === errorCodes.INVALID_TEL_NUM ||
    errorCode === errorCodes.INVALID_PASSWORD ||
    errorCode === errorCodes.INVALID_CITY_NAME ||
    errorCode === errorCodes.INVALID_STREET_NAME ||
    errorCode === errorCodes.INVALID_HOUSE_NUMBER ||
    errorCode === errorCodes.INVALID_FLAT_NUMBER ||
    errorCode === errorCodes.FIRST_NAME_NOT_ALLOWED_SYMBOLS_ERROR ||
    errorCode === errorCodes.LAST_NAME_NOT_ALLOWED_SYMBOLS_ERROR ||
    errorCode === errorCodes.EMAIL_NOT_ALLOWED_SYMBOLS_ERROR ||
    errorCode === errorCodes.TEL_NUM_NOT_ALLOWED_SYMBOLS_ERROR ||
    errorCode === errorCodes.PASSWORD_NOT_ALLOWED_SYMBOLS_ERROR
  ) {
    switch (i18n.languages[0]) {
      case 'en':
        return 'You used invalid characters.';
      case 'ru':
        return 'Использованы недопустимые символы.';
      case 'ua':
        return 'Використані неприпустимі символи.';
      default:
        return 'You used invalid characters.';
    }
  }

  switch (errorCode) {
    case errorCodes.EMPTY_ERROR:
      switch (i18n.languages[0]) {
        case 'en':
          return 'Fill this field.';
        case 'ru':
          return 'Заполните это поле.';
        case 'ua':
          return 'Заповніть це поле.';
        default:
          return 'Fill this field.';
      }
    case errorCodes.CITY_IS_NOT_SERVED:
      switch (i18n.languages[0]) {
        case 'en':
          return 'Delivery in this city is not served yet.';
        case 'ru':
          return 'Доставка в этот населённый пункт пока что недоступна.';
        case 'ua':
          return 'Доставка в цей населений пункт поки що недоступна.';
        default:
          return 'Delivery in this city is not served yet.';
      }
    case errorCodes.NEGATIVE_NUMBER:
      switch (i18n.languages[0]) {
        case 'en':
          return "Negative numbers and '0' (zero) are not allowed.";
        case 'ru':
          return "Отрицательные значения и '0' (ноль) недопустимы.";
        case 'ua':
          return "Від'ємні значення та '0' (нуль) неприпустимі.";
        default:
          return "Negative numbers and '0' (zero) are not allowed.";
      }
    case errorCodes.ACCOUNT_IS_NOT_ACTIVATED:
      switch (i18n.languages[0]) {
        case 'en':
          return 'You must activate your account. Check your email.';
        case 'ru':
          return 'Вы должны активировать свой аккаунт. Проверьте свой имейл.';
        case 'ua':
          return 'Ви повинні активувати свій акаунт. Перевірте свій email.';
        default:
          return 'You must activate your account. Check your email.';
      }
    case errorCodes.INVALID_EMAIL_LENGTH:
      switch (i18n.languages[0]) {
        case 'en':
          return 'Invalid email length.';
        case 'ru':
          return 'Недопустимая длина имейла.';
        case 'ua':
          return 'Неприпустима довжина email.';
        default:
          return 'Invalid email length.';
      }
    case errorCodes.INVALID_TEL_NUM_LENGTH:
      switch (i18n.languages[0]) {
        case 'en':
          return 'Invalid telephone number length.';
        case 'ru':
          return 'Недопустимая длина номера телефона.';
        case 'ua':
          return 'Неприпустима довжина телефонного номеру.';
        default:
          return 'Invalid telephone number length.';
      }
    case errorCodes.INVALID_PASSWORD_LENGTH:
      switch (i18n.languages[0]) {
        case 'en':
          return 'Invalid password length.';
        case 'ru':
          return 'Недопустимая длина пароля.';
        case 'ua':
          return 'Неприпустима довжина паролю.';
        default:
          return 'Invalid password length.';
      }
    case errorCodes.PASSWORDS_ARE_NOT_EQUAL:
      switch (i18n.languages[0]) {
        case 'en':
          return "Password and verification doesn't match.";
        case 'ru':
          return 'Пароль и подтверждение не совпадают.';
        case 'ua':
          return 'Пароль та підтвердження не співпадають.';
        default:
          return "Password and verification doesn't match.";
      }
    case errorCodes.INVALID_SUBJECT:
      switch (i18n.languages[0]) {
        case 'en':
          return 'You must choose a subject.';
        case 'ru':
          return 'Вы должны выбрать тему.';
        case 'ua':
          return 'Ви повинні обрати тему.';
        default:
          return 'You must choose a subject.';
      }

    case errorCodes.EMAIL_DOES_NOT_EXIST:
      switch (i18n.languages[0]) {
        case 'en':
          return 'Incorrect email.';
        case 'ru':
          return 'Аккаунт с таким имейлом не существует.';
        case 'ua':
          return 'Акаунт з таким email не існує.';
        default:
          return 'Incorrect email.';
      }
    case errorCodes.PASSWORD_DOES_NOT_EXIST:
      switch (i18n.languages[0]) {
        case 'en':
          return 'Incorrect password.';
        case 'ru':
          return 'Неправильный пароль.';
        case 'ua':
          return 'Неправильний пароль.';
        default:
          return 'Incorrect password.';
      }
    case errorCodes.OLD_EMAIL_DOES_NOT_MATCH:
      switch (i18n.languages[0]) {
        case 'en':
          return "Email doesn't match with your current one.";
        case 'ru':
          return 'Имейл не совпадает с текущим.';
        case 'ua':
          return 'Email не співпадає з поточним.';
        default:
          return "Email doesn't match with your current one.";
      }
    case errorCodes.OLD_TEL_NUM_DOES_NOT_MATCH:
      switch (i18n.languages[0]) {
        case 'en':
          return "Telephone number doesn't match with your current one.";
        case 'ru':
          return 'Номер телефона не совпадает с текущим.';
        case 'ua':
          return 'Номер телефону не співпадає з поточним.';
        default:
          return "Telephone number doesn't match with your current one.";
      }
    case errorCodes.OLD_PASSWORD_DOES_NOT_MATCH:
      switch (i18n.languages[0]) {
        case 'en':
          return "Password doesn't match with your current one.";
        case 'ru':
          return 'Пароль не совпадает с текущим.';
        case 'ua':
          return 'Пароль не співпадає з поточним.';
        default:
          return "Password doesn't match with your current one.";
      }

    case errorCodes.EMAIL_ALREADY_EXISTS:
      switch (i18n.languages[0]) {
        case 'en':
          return 'This email has been already used.';
        case 'ru':
          return 'Этот имейл уже использовался.';
        case 'ua':
          return 'Цей email вже використовувався.';
        default:
          return 'This email matches with your current one.';
      }
    case errorCodes.TEL_NUM_ALREADY_EXISTS:
      switch (i18n.languages[0]) {
        case 'en':
          return 'This telephone number matches with your current one.';
        case 'ru':
          return 'Этот номер телефона совпадает с Вашим текущим.';
        case 'ua':
          return 'Цей номер телефону співпадає з Вашим поточним.';
        default:
          return 'This telephone number matches with your current one.';
      }
    case errorCodes.PASSWORD_ALREADY_EXISTS:
      switch (i18n.languages[0]) {
        case 'en':
          return 'This password matches with your current one.';
        case 'ru':
          return 'Этот пароль совпадает с Вашим текущим.';
        case 'ua':
          return 'Цей пароль співпадає з Вашим поточним.';
        default:
          return 'This password matches with your current one.';
      }

    case errorCodes.EMAIL_OR_TEL_NUM_IS_REQUIRED:
      switch (i18n.languages[0]) {
        case 'en':
          return 'You must enter either email or telephone number.';
        case 'ru':
          return 'Вы должны ввести свой имейл или номер телефона.';
        case 'ua':
          return 'Ви повинні ввести свій email або номер телефону.';
        default:
          return 'You must enter either email or telephone number.';
      }
    default:
      return '';
  }
}

export function handleInternalServerError(code) {
  if (code === 500
    || code === errorCodes.INVALID_REFRESH_SESSION
    || code === errorCodes.TOKEN_NOT_PROVIDED
    || code === errorCodes.REFRESH_TOKEN_NOT_PROVIDED) {
    switch (i18n.languages[0]) {
      case 'en':
        return 'There are some issues with the server. Try again later or contact us.';
      case 'ru':
        return 'Неполадки на сервере. Попробуйте позже или напишите нам.';
      case 'ua':
        return 'Несправності на сервері. Спробуйте пізніше або напишіть нам.';
      default:
        return 'There are some issues with the server. Try again later or contact us.';
    }
  } else if (code === 600) {
    switch (i18n.languages[0]) {
      case 'en':
        return 'Your session expired, you must login.';
      case 'ru':
        return 'Ваша сессия истекла, Вы должны повторно авторизоваться.';
      case 'ua':
        return 'Ваша сесія закінчилася, Ви маєте повторно авторизуватися.';
      default:
        return 'Your session expired, you must login.';
    }
  } else if (code === 50) {
    switch (i18n.languages[0]) {
      case 'en':
        return 'You ran out of login attempts. Try again after 5 minutes';
      case 'ru':
        return 'Вы израсходовали попытки входа. Повторите через 5 минут.';
      case 'ua':
        return 'Ви витратили спроби входу. Повторіть через 5 хвилин.';
      default:
        return 'You ran out of login attempts. Try again after 5 minutes';
    }
  }
}
