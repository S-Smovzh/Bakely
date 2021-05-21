// import React, { useContext } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import loadable from '@loadable/component';
// import AuthContext from '../context/auth/AuthContext';
// import Main from '../main-page/Main';
// import { AuthedRoute, UnauthedRoute } from './Redirect';
// import {
//   LoadableAbout,
//   LoadableContact,
//   LoadableCookiePolicy,
//   LoadableInfoPage,
//   LoadablePrivacyPolicy,
//   LoadableTermsAndConditions,
//   LoadableLocations
// } from '../lazy-loaders/LazyLoaders';
// import AppSSR from '../indexSSR';
//
// const Attribution = loadable(() =>
//   import(/* webpackChunkName: "attribution", webpackPrefetch: true */ '../attribution/Attribution')
// );
// const PageNotFound = loadable(() => import(/* webpackChunkName: "notFound", webpackPrefetch: true */ '../error/PageNotFound'));
//
// const CateringController = loadable(() => import('../catering/CateringController'));
// const Catering = loadable(() => import('../catering/Catering'), { ssr: true });
// const News = loadable(() => import('../news/News'));
// const PressRelease = loadable(() => import('../news/PressRelease'), { ssr: true });
// const ShopAll = loadable(() => import('../shop-all/ShopAll'), { ssr: true });
// const ProductsList = loadable(() => import('../shop-all/ProductsList'), { ssr: true });
// const ProductPage = loadable(() => import('../shop-all/ProductPage'), { ssr: true });
// const Registration = loadable(() => import('../user/Registration'));
// const EmailValidation = loadable(() => import('../user/EmailValidation'));
// const Login = loadable(() => import('../user/Login'));
// const Homepage = loadable(() => import('../user/Homepage'));
//
//
// export default function Routes() {
//   const authContext = useContext(AuthContext);
//
//   return {
//     ...AppSSR,
//     routes: [
//       {
//         ...Main,
//         path: '/:lang/',
//         exact: true
//       },
//       {
//         ...LoadableAbout,
//         path: '/:lang/about',
//         exact: true
//       },
//       {
//         ...Attribution,
//         path: '/:lang/attribution',
//         exact: true
//       },
//       {
//         ...Catering,
//         path: '/:lang/catering',
//         exact: true
//       },
//       {
//         ...CateringController,
//         path: '/:lang/catering/gallery/celebration',
//         exact: true
//       },
//       {
//         ...CateringController,
//         path: '/:lang/catering/gallery/wedding',
//         exact: true
//       },
//       {
//         ...CateringController,
//         path: '/:lang/catering/gallery/corporate',
//         exact: true
//       },
//       {
//         ...CateringController,
//         path: '/:lang/gallery',
//         exact: true
//       },
//       {
//         ...LoadableContact,
//         path: '/:lang/contact-us',
//         exact: true
//       },
//       {
//         ...LoadableCookiePolicy,
//         path: '/:lang/cookie-policy',
//         exact: true
//       },
//       {
//         ...LoadableInfoPage,
//         path: '/:lang/delivery',
//         exact: true
//       },
//       {
//         ...LoadableInfoPage,
//         path: '/:lang/faq',
//         exact: true
//       },
//       {
//         ...LoadableInfoPage,
//         path: '/:lang/orders',
//         exact: true
//       },
//       {
//         ...LoadableLocations,
//         path: '/:lang/locations',
//         exact: true
//       },
//       {
//         ...News,
//         path: '/:lang/news',
//         exact: true
//       },
//       {
//         ...PressRelease,
//         path: '/:lang/news/article/:id',
//         exact: true
//       },
//       {
//         ...LoadablePrivacyPolicy,
//         path: '/:lang/privacy-policy',
//         exact: true
//       },
//       {
//         ...ShopAll,
//         path: '/:lang/shop',
//         exact: true
//       },
//       {
//         ...ProductsList,
//         path: '/:lang/shop/:type',
//         exact: true
//       },
//       {
//         ...ProductPage,
//         path: '/:lang/shop/:type/:id',
//         exact: true
//       },
//       {
//         ...LoadableTermsAndConditions,
//         path: '/:lang/terms-and-conditions',
//         exact: true
//       },
//       {
//         ...Registration,
//         path: '/:lang/user/registration',
//         exact: true
//       },
//       {
//         ...EmailValidation,
//         path: '/:lang/user/verification/:email/:verificationCode',
//         exact: true
//       },
//       {
//         ...Homepage,
//         path: '/:lang/user/homepage',
//         exact: true,
//         prop: authContext.logged,
//         isPrivate: true
//       },
//       {
//         ...Login,
//         path: '/:lang/user/login',
//         exact: true,
//         prop: authContext.logged
//       },
//       {
//         ...PageNotFound,
//         isPrivate: true
//       }
//     ]
//   };
// }
