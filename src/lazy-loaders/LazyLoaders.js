import React from 'react';
import loadable from '@loadable/component';
import { LoadingFallback } from './LoadingFallback';

const LoadableAbout = loadable(() =>
    import(/* webpackChunkName: "about" */ '../about/About'),
  {
    fallback:
  <LoadingFallback/>
  }
);

const LoadableContact = loadable(() =>
    import(/* webpackChunkName: "contact" */ '../contact-us/ContactUs'),
  {
    fallback:
  <LoadingFallback/>
  }
);

const LoadableCookiePolicy = loadable(() =>
    import(/* webpackChunkName: "cookPol" */ '../info-pages/CookiePolicy'),
  {
    fallback:
  <LoadingFallback/>
  }
);

const LoadableTermsAndConditions = loadable(() =>
    import(/* webpackChunkName: "termCond" */ '../info-pages/TermsAndConditions'),
  {
    fallback:
  <LoadingFallback/>
  }
);

const LoadablePrivacyPolicy = loadable(() =>
    import(/* webpackChunkName: "privPol" */ '../info-pages/PrivacyPolicy'),
  {
    fallback:
  <LoadingFallback/>
  }
);

const LoadableInfoPage = loadable(() =>
    import(/* webpackChunkName: "info" */ '../info-pages/InformationPage'),
  {
    fallback:
  <LoadingFallback/>
  }
);

const LoadableLocations = loadable(() =>
    import(/* webpackChunkName: "locations" */ '../locations/Locations'),
  {
    ssr: true,
    fallback:
  <LoadingFallback/>
  }
);

const LoadableOrder = loadable(() => import(/* webpackChunkName: "order" */ '../order/OrderForm'),
  {
    fallback:
  <LoadingFallback/>
  }
);

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
