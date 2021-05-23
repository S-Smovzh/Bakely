import React, { lazy, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, withRouter, useHistory } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { animated } from 'react-spring';
import { delay } from 'rxjs/operators';
import { interval, timer } from 'rxjs';
import axios from 'axios';
import NotificationButton from './UI-components/button/notification/NotificationButton';
import ScrollToTopButton from './UI-components/button/scroll-to-top/ScrollToTopButton';
import { Verification } from './UI-components/toasts/components/Verification';
import { NavbarMenuContext } from './context/navbar-menu/NavbarMenuContext';
import { Subscribe } from './UI-components/toasts/components/Subscribe';
import { HoverTooltip } from './UI-components/tooltip/HoverTooltip';
import ActivationModal from './UI-components/modal/ActivationModal';
import { Cookie } from './UI-components/toasts/components/Cookie';
import { FrameContext } from './context/frame/FrameContext';
import { ModalContext } from './context/modal/ModalContext';
import { ToastContext } from './context/toast/ToastContext';
import useWindowDimensions from './utils/useWindowDimensions';
import { Navbar } from './UI-components/navbar/Navbar';
import { Footer } from './UI-components/footer/Footer';
import AuthContext from './context/auth/AuthContext';
import CartContext from './context/cart/CartContext';
import { Menu } from './UI-components/menu/Menu';
import i18n, { changeLang } from './utils/i18n';
import { logError } from './error/errorHandler';
import { userLinks } from './utils/restLinks';
import { Routes } from './routes/Routes';
import './UI-components/link/Link.css';
import { Cart } from './cart/Cart';

const CateringModal = lazy(() =>
  import(/* webpackChunkName: "activationModal", webpackPrefetch: true */ './catering/modal/CateringModal')
);

const ErrorModal = lazy(() =>
  import(/* webpackChunkName: "activationModal", webpackPrefetch: true */ './UI-components/modal/ErrorModal')
);

function Bakely() {
  const [loading, setLoading] = useState(true);
  const [firstRefresh, setFirstRefresh] = useState(true);
  const [translatePixels, setTranslatePixels] = useState(-220);
  const menuContext = useContext(NavbarMenuContext);
  const { toast } = useContext(ToastContext);
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const location = useLocation();
  const history = useHistory();
  const frameRef = useRef(null);
  const toastRef = useRef();
  const { modal, setModal } = useContext(ModalContext);
  const { setFrame } = useContext(FrameContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setFrame(frameRef.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (cartContext.show || (width < 481 && menuContext.show)
      || (width < 768 && (toast.showCookie || toast.showSubscription || toast.verified)
        && document.getElementsByClassName('Toast-Stack-Reveal').length > 0)) {
      document.getElementById('root').classList.add('Block-Scrolling');
    } else {
      document.getElementById('root').classList.remove('Block-Scrolling');
    }
  }, [cartContext, menuContext, toast]);

  useEffect(() => {
    const language = navigator.languages && navigator.languages[0] ||
      navigator.language ||
      navigator.userLanguage;

    if (typeof window !== 'undefined') {
      if (!localStorage.getItem(btoa('f-r'))) {
        changeLang(i18n, language);
        localStorage.setItem(btoa('f-r'), btoa('true'));
      }
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
  }, [ location ]);

  useEffect(() => {
    timer(20).subscribe(() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' }));
  }, [ location ]);

  useEffect(() => {
    authContext.checkState();
    if (authContext.logged) {
      if (firstRefresh) {
        setFirstRefresh(false);
        refreshSession();
      } else {
        const timerSubscription = timer(840000).subscribe(() => {
          timerSubscription.unsubscribe();
          refreshSession();
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

    timer(50).subscribe(async () =>
      await axios.post(
        userLinks.refresh,
        {
          fingerprint: result.visitorId
        },
        {
          headers: {
            Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
            'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
              ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
            withCredentials: true
          }
        }
      ).then((response) => {
        const { success, errors, body } = response.data;

        if (!success && errors) {
          setModal({
            ...modal,
            errorCode: errors.code,
            internalFailure: true
          });
        } else if (typeof window !== 'undefined') {
          localStorage.setItem(btoa('token'), btoa(JSON.stringify(body[0].token)));
          localStorage.setItem(btoa('refreshToken'), btoa(JSON.stringify(body[1].refreshToken)));
          let subscription = interval(840000).subscribe(() => {
            subscription.unsubscribe();
            refreshSession();
          });
        }
      }).catch((error) => logError(error))
    );
  }

  return (
    <div className="Playfair Grid Base">
      <Menu/>
      {width < 1851 && (
        <NotificationButton>
          {/* eslint-disable-next-line max-len */}
          <div ref={toastRef} className="Toasts-Stack">
            {toast.showCookie ?
              <Cookie/>
              : null}
            {(typeof window !== 'undefined' && localStorage.getItem(btoa('cookies')) &&
              atob(localStorage.getItem(btoa('cookies'))) === 'false')
              ?
              delay(6000) && <Subscribe/>
              : null}
            {toast.verified ?
              <Verification/>
              : null}
          </div>
        </NotificationButton>
      )}
      <animated.div ref={frameRef}
        style={{ transform: cartContext.show ? `translateX(${translatePixels}px)` : 'translateX(0)' }}
        className="Grid P-W">
        <Navbar/>
        {!loading && (
          <main id="main" className="Page">
            <Routes/>
          </main>
        )}
        <Footer/>
      </animated.div>
      {!(cartContext.show && width < 769) ? <ScrollToTopButton/> : null} <Cart/>
      <HoverTooltip/>
      <ErrorModal/>
      <ActivationModal/>
      <CateringModal/>
      {width > 1850 ? (
        <div className="Toasts-Stack">
          <Cookie/>
          {(typeof window !== 'undefined' && localStorage.getItem(btoa('cookies')) &&
              atob(localStorage.getItem(btoa('cookies'))) === 'false')
              ?
              delay(6000) && <Subscribe/>
              : null}
          <Verification/>
        </div>
        )
        : null}
    </div>
  );
}

export default withRouter(Bakely);
