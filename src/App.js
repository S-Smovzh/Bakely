import React, { useContext, useEffect, useState } from 'react';
import { useLocation, withRouter, useHistory } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { animated } from 'react-spring';
import { interval, timer } from 'rxjs';
import axios from 'axios';
import ScrollToTopButton from './UI-components/button/scroll-to-top/ScrollToTopButton';
import { ModalContext } from './context/modal/ModalContext';
import useWindowDimensions from './utils/isTouchDevice';
import { Navbar } from './UI-components/navbar/Navbar';
import { Footer } from './UI-components/footer/Footer';
import AuthContext from './context/auth/AuthContext';
import CartContext from './context/cart/CartContext';
import { userConfig } from './utils/restApiConfigs';
import ErrorBoundary from './error/ErrorBoundary';
import i18n, { changeLang } from './utils/i18n';
import { logError } from './error/errorHandler';
import { Routes } from './routes/Routes';
import './UI-components/link/Link.css';

function Bakely() {
  const [loading, setLoading] = useState(true);
  const [firstRefresh, setFirstRefresh] = useState(true);
  const [translatePixels, setTranslatePixels] = useState(-220);
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const location = useLocation();
  const history = useHistory();
  const { modal, setModal } = useContext(ModalContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const language = navigator.languages && navigator.languages[0] ||
      navigator.language ||
      navigator.userLanguage;

    if (!localStorage.getItem(btoa('f-r'))) {
      changeLang(i18n, language);
      localStorage.setItem(btoa('f-r'), btoa('true'));
    }
  }, []);

  useEffect(() => {
    const langs = ['en', 'ru', 'ua'];
    const lang = location.pathname.split('/')[1];

    if (!langs.includes(lang)) {
      history.push({ pathname: `/${i18n.language}/` });
    }
  }, [ location.pathname ]);

  useEffect(() => {
    changeLang(i18n, i18n.language);
    cartContext.showCart(false);
    cartContext.loadProducts();
    setLoading(false);
    // if (location.pathname === '/user/homepage' && location.isLoggedIn) {
    //   timer(100).subscribe(() => authContext.loadDeliveryAddresses());
    // }
  }, [ location ]);

  useEffect(() => {
    timer(20).subscribe(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }, [ location ]);

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
          refreshSession();
          // const t2 = Date.now();
          // console.log(t2 - t1);
        });
      }
    }
  }, [ authContext.logged ]);

  useEffect(() => {
    if (width > 1600) {
      setTranslatePixels(-220);
    } else if (width > 768 <= 1600) {
      setTranslatePixels(-400);
    } else if (width <= 768) {
      setTranslatePixels(0);
    }
  }, [ width ]);

  async function refreshSession() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    await axios.post(
      'http://localhost:5000/api/protected/user/auth/refresh',
      {
        fingerprint: result.visitorId
      }, userConfig
    ).then((response) => {
      const { success, errors, body } = response.data;

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
        });
      }
    }).catch((error) => logError(error));
  }

  return (
    <React.Fragment>
      <animated.div style={{ transform: cartContext.show ? `translateX(${translatePixels}px)` : 'translateX(0)' }}
        className="Grid P-W">
        <Navbar/>
        {!loading && (
          <main id="main" className="Page">
            <ErrorBoundary handleReturn={() => history.push({ pathname: '/en/' })}>
              <Routes/>
            </ErrorBoundary>
          </main>
        )}
        <Footer/>
      </animated.div>
      {!(cartContext.show && width < 769) ? <ScrollToTopButton/> : null}
    </React.Fragment>
  );
}

export default withRouter(Bakely);
