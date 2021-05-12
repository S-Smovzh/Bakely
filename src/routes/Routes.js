import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
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

const Attribution = loadable(() =>
  import(/* webpackChunkName: "attribution", webpackPrefetch: true */ '../attribution/Attribution')
);
const PageNotFound = loadable(() => import(/* webpackChunkName: "notFound", webpackPrefetch: true */ '../error/PageNotFound'));

const CateringController = loadable(() => import('../catering/CateringController'));
const Catering = loadable(() => import('../catering/Catering'), { ssr: true });
const News = loadable(() => import('../news/News'));
const PressRelease = loadable(() => import('../news/PressRelease'), { ssr: true });
const ShopAll = loadable(() => import('../shop-all/ShopAll'), { ssr: true });
const ProductsList = loadable(() => import('../shop-all/ProductsList'), { ssr: true });
const ProductPage = loadable(() => import('../shop-all/ProductPage'), { ssr: true });
const Registration = loadable(() => import('../user/Registration'));
const EmailValidation = loadable(() => import('../user/EmailValidation'));
const Login = loadable(() => import('../user/Login'));
const Homepage = loadable(() => import('../user/Homepage'));

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
      <Route exact path="/:lang/error/internal" component={LoadableInfoPage}
        isPrivate={false}
      />
      <Route exact path="/:lang/faq" component={LoadableInfoPage}
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
      <Route exact path="/:lang/orders" component={LoadableInfoPage}
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
