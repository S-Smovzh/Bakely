import React, {useContext, useEffect, useState} from 'react';
import {Route, Switch, useLocation, withRouter} from 'react-router-dom';
import {About} from './about/About';
import {Careers} from './careers/Careers';
import {AuthedRoute, UnauthedRoute} from './routes/Redirect';
import Registration from './user/Registration';
import {PageNotFound} from './error/NotFoundPage';
import {Locations} from './locations/Locations';
import Login from './user/Login';
import ContactUs from './contact-us/ContactUs';
import Catering from './catering/Catering';
import CateringController from './catering/CateringController';
import ShopAll from './shop-all/ShopAll';
import News from './news/News';
import PressRelease from './news/PressRelease';
import ProductPage from './shop-all/ProductPage';
import Homepage from './user/Homepage';
import {I18nextProvider} from 'react-i18next';
import i18n, {changeLang} from './utils/i18n';
import Main from './main-page/Main';
import AuthContext from './context/auth/AuthContext';
import {interval, timer} from "rxjs";
import axios from "axios";
import {ModalContext} from "./context/modal/ModalContext";
import {animated} from "react-spring";
import {Navbar} from "./UI-components/navbar/Navbar";
import {Footer} from "./UI-components/footer/Footer";
import CartContext from "./context/cart/CartContext";
import {EmailValidation} from "./user/Activation";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import InformationPage from "./info-pages/InformationPage";
import PrivacyPolicy from "./info-pages/PrivacyPolicy";
import TermsAndConditions from "./info-pages/TermsAndConditions";
import CookiePolicy from "./info-pages/CookiePolicy";
import './UI-components/link/Link.css';
import ProductsList from "./shop-all/ProductsList";
import useWindowDimensions from "./utils/isTouchDevice";
import {userConfig} from "./utils/restApiConfigs";
import {logError} from "./error/errorHandler";

function Bakely() {
  const {modal, setModal} = useContext(ModalContext);
  const [loading, setLoading] = useState(true);
  const [firstRefresh, setFirstRefresh] = useState(true);
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const location = useLocation();
  const {width} = useWindowDimensions();
  const [translatePixels, setTranslatePixels] = useState(-220);

  useEffect(() => {
    changeLang(i18n, i18n.language);
    cartContext.showCart(false);
    cartContext.loadProducts();
    setLoading(false);
    // if (location.pathname === '/user/homepage' && location.isLoggedIn) {
    //   timer(100).subscribe(() => authContext.loadDeliveryAddresses());
    // }
  }, [location]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [location]);

  useEffect(() => {
    authContext.checkState();
    if (authContext.logged) {
      // const t1 = Date.now();

      if (firstRefresh) {
        setFirstRefresh(false);
        refreshSession();
        // const t2 = Date.now();
        // console.log(t2 - t1);
      } else {
        const timerSubscription = timer(840000).subscribe(() => {
          timerSubscription.unsubscribe();
          refreshSession()
          // const t2 = Date.now();
          // console.log(t2 - t1);
        });
      }
    }
  }, [authContext.logged])

  async function refreshSession() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    await axios.post(
      'http://localhost:5000/api/protected/user/auth/refresh',
      {
        fingerprint: result.visitorId
      }, userConfig
    ).then((response) => {
      const {success, errors, body} = response.data;
      if (!success && errors) {
        setModal({
          ...modal,
          errorCode: errors.code,
          internalFailure: true
        });
      } else {
        localStorage.setItem(btoa('token'), btoa(JSON.stringify(body[0].token)));
        localStorage.setItem(btoa('refreshToken'), btoa(JSON.stringify(body[1].refreshToken)));
        // console.log('refreshed');
        // const t1 = Date.now();
        let subscription = interval(840000).subscribe(() => {
          subscription.unsubscribe();
          // const t2 = Date.now();
          // console.log(t2 - t1);
          refreshSession();
        })
      }
    }).catch((error) => logError(error));
  }

  useEffect(() => {
    if (width > 1600) {
      setTranslatePixels(-220);
    } else if (768 < width <= 1600) {
      setTranslatePixels(-400);
    } else if (width <= 768) {
      setTranslatePixels(0);
    }
  }, [width])

  return (
    <animated.div style={{transform: cartContext.show ? `translateX(${translatePixels}px)` : `translateX(0)`}}
                  className='Page-Wrapper'>
      <Navbar/>
      {!loading &&
      <main id='main' className='MainBlock'>
        <I18nextProvider i18n={i18n}>
          <Switch>
            <Route exact path='/' component={Main} isPrivate={false}/>
            <Route exact path='/about' component={About} isPrivate={false}/>
            {/*<Route exact path='/attribution' component={Attribution} isPrivate={false}/>*/}
            <Route exact path='/careers' component={Careers} isPrivate={false}/>
            <Route exact path='/catering' component={Catering} isPrivate={false}/>
            <Route exact path='/catering/gallery/celebration' component={CateringController} isPrivate={false}/>
            <Route exact path='/catering/gallery/wedding' component={CateringController} isPrivate={false}/>
            <Route exact path='/catering/gallery/corporate' component={CateringController} isPrivate={false}/>
            <Route exact path='/contact-us' component={ContactUs} isPrivate={false}/>
            <Route exact path='/cookie-policy' component={CookiePolicy} isPrivate={false}/>
            <Route exact path='/delivery' component={InformationPage} isPrivate={false}/>
            <Route exact path='/faq' component={InformationPage} isPrivate={false}/>
            <Route exact path='/gallery' component={CateringController} isPrivate={false}/>
            <Route exact path='/locations' component={Locations} isPrivate={false}/>
            <Route exact path='/news' component={News} isPrivate={false}/>
            <Route path='/news/article/:id' component={PressRelease} isPrivate={false}/>
            <Route exact path='/orders' component={InformationPage} isPrivate={false}/>
            <Route exact path='/privacy-policy' component={PrivacyPolicy} isPrivate={false}/>
            <Route exact path='/shop' component={ShopAll} isPrivate={false}/>
            <Route exact path='/shop/:type' component={ProductsList} isPrivate={false}/>
            <Route exact path='/shop/:type/:id' component={ProductPage} isPrivate={false}/>
            <Route exact path='/terms-and-conditions' component={TermsAndConditions} isPrivate={false}/>

            <Route exact path='/user/registration' component={Registration} isPrivate={false}/>
            <Route exact path='/user/verification/:email/:verificationCode' component={EmailValidation}
                   isPrivate={false}/>
            <AuthedRoute exact path='/user/homepage' component={Homepage} prop={authContext.logged} isPrivate={true}/>
            <UnauthedRoute exact path='/user/login' component={Login} prop={authContext.logged} isPrivate={false}/>

            <Route component={PageNotFound} isPrivate={true}/>
          </Switch>
        </I18nextProvider>
      </main>}
      <Footer/>
    </animated.div>
  );
}

export default withRouter(Bakely);
