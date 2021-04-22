import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import detector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(detector)
  .use(initReactI18next)
  .init({
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en',
    keySeparator: false,
    useLocalStorage: true,
    // useDataAttrOptions: true,
    backend: {
      // resources,
      loadPath: '/locale/{{lng}}.json',
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
  i18n.changeLanguage(lng).catch(error => console.log(error));
}