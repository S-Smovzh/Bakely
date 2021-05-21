import React, { lazy } from 'react';
// import loadable from '@loadable/component';
// import { LoadingFallback } from './LoadingFallback';

const LoadableAbout = lazy(() => import(/* webpackChunkName: "about" */ '../about/About'));

const LoadableContact = lazy(() => import(/* webpackChunkName: "contact" */ '../contact-us/ContactUs'));

const LoadableCookiePolicy = lazy(() => import(/* webpackChunkName: "cookPol" */ '../info-pages/CookiePolicy'));

const LoadableTermsAndConditions = lazy(() => import(/* webpackChunkName: "termCond" */ '../info-pages/TermsAndConditions'));

const LoadablePrivacyPolicy = lazy(() => import(/* webpackChunkName: "privPol" */ '../info-pages/PrivacyPolicy'));

const LoadableInfoPage = lazy(() => import(/* webpackChunkName: "info" */ '../info-pages/InformationPage'));

const LoadableLocations = lazy(() => import(/* webpackChunkName: "locations" */ '../locations/Locations'));

const LoadableOrder = lazy(() => import(/* webpackChunkName: "order" */ '../order/OrderForm'));

// const LoadableAbout = loadable(() => import(/* webpackChunkName: "about" */ '../about/About'), {
//   fallback: <LoadingFallback/>
// });
//
// const LoadableContact = loadable(() => import(/* webpackChunkName: "contact" */ '../contact-us/ContactUs'), {
//   fallback: <LoadingFallback/>
// });
//
// const LoadableCookiePolicy = loadable(() => import(/* webpackChunkName: "cookPol" */ '../info-pages/CookiePolicy'), {
//   fallback: <LoadingFallback/>
// });
//
// const LoadableTermsAndConditions = loadable(() =>
//   import(/* webpackChunkName: "termCond" */ '../info-pages/TermsAndConditions'), {
//   fallback: <LoadingFallback/>
// });
//
// const LoadablePrivacyPolicy = loadable(() => import(/* webpackChunkName: "privPol" */ '../info-pages/PrivacyPolicy'), {
//   fallback: <LoadingFallback/>
// });
//
// const LoadableInfoPage = loadable(() => import(/* webpackChunkName: "info" */ '../info-pages/InformationPage'), {
//   fallback: <LoadingFallback/>
// });
//
// const LoadableLocations = loadable(() => import(/* webpackChunkName: "locations" */ '../locations/Locations'), {
//   fallback: <LoadingFallback/>
// });
//
// const LoadableOrder = loadable(() => import(/* webpackChunkName: "order" */ '../order/OrderForm'), {
//   fallback: <LoadingFallback/>
// });

export {
  LoadableAbout,
  LoadableContact,
  LoadableCookiePolicy,
  LoadableInfoPage,
  LoadablePrivacyPolicy,
  LoadableTermsAndConditions,
  LoadableLocations,
  LoadableOrder
};
