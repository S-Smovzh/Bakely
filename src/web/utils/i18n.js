import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';
import i18n from 'i18next';
import { logError } from '../error/errorHandler';

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    ns: [ 'common' ],
    defaultNS: 'common',
    fallbackLng: ['en', 'ru', 'ua'],
    keySeparator: false,
    useLocalStorage: true,
    load: 'languageOnly',
    backend: {
      loadPath: 'https://bakkely.herokuapp.com/locale/{{lng}}.json',
      allowMultiLoading: true
    },
    react: {
      wait: true,
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

export function changeLang(i18n, lng) {
  i18n.changeLanguage(lng).catch(error => logError(error));
}
