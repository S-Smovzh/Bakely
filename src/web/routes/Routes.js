import React, { lazy, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
// import loadable from '@loadable/component';
import AuthContext from '../context/auth/AuthContext';
import Main from '../main-page/Main';
import { AuthedRoute, UnauthedRoute } from './Redirect';
import {
  LoadableAbout,
  LoadableContact,
  LoadableCookiePolicy,
  LoadableInfoPage,
  LoadablePrivacyPolicy,
  LoadableTermsAndConditions,
  LoadableLocations
} from '../lazy-loaders/LazyLoaders';
// import { LoadingFallback } from '../lazy-loaders/LoadingFallback';

const Attribution = lazy(() =>  import(/* webpackChunkName: "attribution" */ '../attribution/Attribution'));
const PageNotFound = lazy(() =>  import(/* webpackChunkName: "notFound" */ '../error/PageNotFound'));
const CateringController = lazy(() =>
  import(/* webpackChunkName: "cateringController", webpackPrefetch: true */ '../catering/CateringController')
);
const Catering = lazy(() =>  import(/* webpackChunkName: "catering" */ '../catering/Catering'));
const News = lazy(() =>  import(/* webpackChunkName: "news" */ '../news/News'));
const PressRelease = lazy(() =>  import(/* webpackChunkName: "pressRelease" */ '../news/PressRelease'));
const ShopAll = lazy(() =>  import(/* webpackChunkName: "shopAll", webpackPrefetch: true */ '../shop-all/ShopAll'));
const ProductsList = lazy(() =>  import(/* webpackChunkName: "prodList", webpackPrefetch: true */ '../shop-all/ProductsList'));
const ProductPage = lazy(() =>  import(/* webpackChunkName: "prodPage", webpackPrefetch: true */ '../shop-all/ProductPage'));
const Registration = lazy(() => import(/* webpackChunkName: "registration", webpackPrefetch: true */ '../user/Registration'));
const EmailValidation = lazy(() => import(/* webpackChunkName: "emailVal", webpackPrefetch: true */ '../user/EmailValidation'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ '../user/Login'));
const Homepage = lazy(() => import(/* webpackChunkName: "homepage" */ '../user/Homepage'),);

// const Attribution = loadable(() =>
//   import(/* webpackChunkName: "attribution" */ '../attribution/Attribution'), {
//   fallback: <LoadingFallback/>
// });
// const PageNotFound = loadable(() =>
//   import(/* webpackChunkName: "notFound" */ '../error/PageNotFound'), {
//   fallback: <LoadingFallback/>
// });
// const CateringController = loadable(() =>
//   import(/* webpackChunkName: "cateringController", webpackPrefetch: true */ '../catering/CateringController'), {
//   fallback: <LoadingFallback/>
// });
// const Catering = loadable(() =>
//   import(/* webpackChunkName: "catering" */ '../catering/Catering'), {
//   fallback: <LoadingFallback/>
// });
// const News = loadable(() =>
//   import(/* webpackChunkName: "news" */ '../news/News'), {
//   fallback: <LoadingFallback/>
// });
// const PressRelease = loadable(() =>
//   import(/* webpackChunkName: "pressRelease" */ '../news/PressRelease'), {
//   fallback: <LoadingFallback/>
// });
// const ShopAll = loadable(() =>
//   import(/* webpackChunkName: "shopAll", webpackPrefetch: true */ '../shop-all/ShopAll'), {
//   fallback: <LoadingFallback/>
// });
// const ProductsList = loadable(() =>
//   import(/* webpackChunkName: "prodList", webpackPrefetch: true */ '../shop-all/ProductsList'), {
//   fallback: <LoadingFallback/>
// });
// const ProductPage = loadable(() =>
//   import(/* webpackChunkName: "prodPage", webpackPrefetch: true */ '../shop-all/ProductPage'), {
//   fallback: <LoadingFallback/>
// });
// const Registration = loadable(() =>
//   import(/* webpackChunkName: "registration", webpackPrefetch: true */ '../user/Registration'), {
//   fallback: <LoadingFallback/>
// });
// const EmailValidation = loadable(() =>
//   import(/* webpackChunkName: "emailVal", webpackPrefetch: true */ '../user/EmailValidation'), {
//   fallback: <LoadingFallback/>
// });
// const Login = loadable(() =>
//   import(/* webpackChunkName: "login" */ '../user/Login'), {
//   fallback: <LoadingFallback/>
// });
// const Homepage = loadable(() =>
//   import(/* webpackChunkName: "homepage" */ '../user/Homepage'), {
//   fallback: <LoadingFallback/>
// });

export const Routes = () => {
  const authContext = useContext(AuthContext);

  return (
    <Switch>
      <Route exact path="/:lang/" component={Main}
        isPrivate={false}
      />
      <Route exact path="/:lang/about" component={LoadableAbout}
        isPrivate={false}
      />
      <Route exact path="/:lang/attribution" component={Attribution}
        isPrivate={false}
      />
      <Route exact path="/:lang/catering" component={Catering}
        isPrivate={false}
      />
      <Route exact path="/:lang/catering/gallery/celebration" component={CateringController}
        isPrivate={false}
      />
      <Route exact path="/:lang/catering/gallery/wedding" component={CateringController}
        isPrivate={false}
      />
      <Route exact path="/:lang/catering/gallery/corporate" component={CateringController}
        isPrivate={false}
      />
      <Route exact path="/:lang/gallery" component={CateringController}
        isPrivate={false}
      />
      <Route exact path="/:lang/contact-us" component={LoadableContact}
        isPrivate={false}
      />
      <Route exact path="/:lang/cookie-policy" component={LoadableCookiePolicy}
        isPrivate={false}
      />
      <Route exact path="/:lang/delivery" component={LoadableInfoPage}
        isPrivate={false}
      />
      <Route exact path="/:lang/faq" component={LoadableInfoPage}
        isPrivate={false}
      />
      <Route exact path="/:lang/orders" component={LoadableInfoPage}
        isPrivate={false}
      />
      <Route exact path="/:lang/locations" component={LoadableLocations}
        isPrivate={false}
      />
      <Route exact path="/:lang/news" component={News}
        isPrivate={false}
      />
      <Route exact path="/:lang/news/article/:id" component={PressRelease}
        isPrivate={false}
      />
      <Route exact path="/:lang/privacy-policy" component={LoadablePrivacyPolicy}
        isPrivate={false}
      />
      <Route exact path="/:lang/shop" component={ShopAll}
        isPrivate={false}
      />
      <Route exact path="/:lang/shop/:type" component={ProductsList}
        isPrivate={false}
      />
      <Route exact path="/:lang/shop/:type/:id" component={ProductPage}
        isPrivate={false}
      />
      <Route exact path="/:lang/terms-and-conditions" component={LoadableTermsAndConditions}
        isPrivate={false}
      />

      <Route exact path="/:lang/user/registration" component={Registration}
        isPrivate={false}
      />
      <Route exact path="/:lang/user/verification/:email/:verificationCode" component={EmailValidation}
        isPrivate={false}
      />
      <AuthedRoute exact path="/:lang/user/homepage" component={Homepage}
        prop={authContext.logged} isPrivate
      />
      <UnauthedRoute exact path="/:lang/user/login" component={Login}
        prop={authContext.logged} isPrivate={false}
      />

      <Route component={PageNotFound} isPrivate/>
    </Switch>
  );
};
