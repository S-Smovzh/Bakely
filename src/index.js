import React, { useEffect, useRef, useState } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import loadable from '@loadable/component';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { delay } from 'rxjs/operators';
import { render, hydrate } from 'react-dom';
import axios from 'axios';
import 'bootstrap';
import { NotificationOverlayContext } from './context/notification-overlay/NavbarMenuContext';
import NotificationButton from './UI-components/button/notification/NotificationButton';
import { Verification } from './UI-components/toasts/components/Verification';
import { NavbarMenuContext } from './context/navbar-menu/NavbarMenuContext';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Subscribe } from './UI-components/toasts/components/Subscribe';
import { OrderFormContext } from './context/orderForm/OrderFormContext';
import { HoverTooltip } from './UI-components/tooltip/HoverTooltip';
import { Cookie } from './UI-components/toasts/components/Cookie';
import { logError, sendErrorReport } from './error/errorHandler';
import { ModalContext } from './context/modal/ModalContext';
import { ToastContext } from './context/toast/ToastContext';
import useWindowDimensions from './utils/isTouchDevice';
// import reportWebVitals from './utils/reportWebVitals';
import { Menu } from './UI-components/navbar/Menu';
import ErrorBoundary from './error/ErrorBoundary';
import CartState from './context/cart/CartState';
import AuthState from './context/auth/AuthState';
import { Cart } from './cart/Cart';
import i18n from './utils/i18n';
import Bakely from './App';
import './utils/i18n';
import './UI-components/dropdown/Dropdown.css';
import './UI-components/button/Button.css';
import './UI-components/navbar/Navbar.css';
import './UI-components/footer/Footer.css';
import './UI-components/modal/Modal.css';
import './UI-components/form/Form.css';
import './css/base/Effects.css';
import './css/base/Colors.css';
import './css/base/App.css';
import './css/index.css';

const ActivationModal = loadable(() =>
  import(/* webpackChunkName: "activationModal", webpackPrefetch: true */ './UI-components/modal/ActivationModal')
);
const CateringModal = loadable(() =>
  import(/* webpackChunkName: "cateringModal", webpackPrefetch: true */ './catering/modal/CateringModal')
);
const ErrorModal = loadable(() =>
  import(/* webpackChunkName: "errorModal", webpackPrefetch: true */ './UI-components/modal/ErrorModal')
);

function App() {
  const toastRef = useRef(null);
  const { width } = useWindowDimensions();

  const [modal, setModal] = useState({
    cateringModal: false,
    locationModal: false,
    internalError: false,
    errorCode: 0,
    clientsOrder: false,
    usersOrder: false,
    activationModal: false,
    notActivated: false
  });
  const modalValue = { modal, setModal };

  const [toast, setToast] = useState({
    showSubscription: atob(localStorage.getItem(btoa('subscriptionShow'))) === 'true'
      || localStorage.getItem(btoa('subscriptionShow')) === null,
    showCookie: atob(localStorage.getItem(btoa('cookies'))) === 'true' || localStorage.getItem(btoa('cookies')) === null,
    hoverTipShow: false,
    tipTop: '70%',
    verified: false
  });
  const toastValue = { toast, setToast };

  const [navbar, setNavbar] = useState({
    show: false
  });
  const navbarValue = { navbar, setNavbar };

  const [overlay, setOverlay] = useState({
    show: 2
  });
  const overlayValue = { overlay, setOverlay };

  const [orderForm, setOrderForm] = useState({
    delivery: false,
    selfPickUp: false,
    proceedOrder: false,
    bakery: '',
    comment: ''
  });
  const orderFormValue = { orderForm, setOrderForm };

  useEffect(() => {
    createClientsSession();
    sendErrorReport();
  }, []);

  useEffect(() => {
    if (overlay.show !== 2) {
      if (overlay.show) {
        document.getElementById('root').classList.add('BlockScroll');
      } else {
        document.getElementById('root').classList.remove('BlockScroll');
      }
    }
  }, [ overlay.show ]);

  function createClientsSession() {
    if (!localStorage.getItem(btoa('clientsToken'))) {
      axios.get('http://localhost:5000/api/protected/client/auth/create-session')
        .then((response) => {
          const { success, body } = response.data;

          if (success) {
            localStorage.setItem(btoa('clientsToken'), btoa(JSON.stringify(body[0].token)));
          }
        }).catch((error) => logError(error));
    }
  }

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <CloudinaryContext>
          <NotificationOverlayContext.Provider value={overlayValue}>
            <ModalContext.Provider value={modalValue}>
              <ToastContext.Provider value={toastValue}>
                <NavbarMenuContext.Provider value={navbarValue}>
                  <OrderFormContext.Provider value={orderFormValue}>
                    <CartState>
                      <AuthState>
                        <div className={'Playfair Grid Base ' + (modal.modal ? 'BlockScroll ' : '')}>
                          <Menu/>
                          {width < 1851 && (
                          <NotificationButton>
                            <div ref={toastRef} className="Toasts-Stack Small-Device">
                              {toast.showCookie ?
                                <Cookie/>
                                : null}
                              {localStorage.getItem(btoa('cookies')) && atob(localStorage.getItem(btoa('cookies'))) === 'false'
                                ?
                                delay(6000) && <Subscribe/>
                                : null}
                              {toast.verified ?
                                <Verification/>
                                : null}
                            </div>
                          </NotificationButton>
                        )}
                          <Bakely/>
                          <Cart/>
                          <HoverTooltip/>
                          <ErrorModal/>
                          <ActivationModal/>
                          <CateringModal/>
                          {width > 1850 ? (
                            <div className="Toasts-Stack">
                              <Cookie/>
                              {localStorage.getItem(btoa('cookies')) && atob(localStorage.getItem(btoa('cookies'))) === 'false'
                              ?
                              delay(6000) && <Subscribe/>
                              : null}
                              <Verification/>
                            </div>
                        )
                          : null}
                        </div>
                      </AuthState>
                    </CartState>
                  </OrderFormContext.Provider>
                </NavbarMenuContext.Provider>
              </ToastContext.Provider>
            </ModalContext.Provider>
          </NotificationOverlayContext.Provider>
        </CloudinaryContext>
      </BrowserRouter>
    </I18nextProvider>
  );
}

loadableReady(() => {
  hydrate(
    <App/>,
    document.getElementById('root')
  );
});
//
// render(<ErrorBoundary handleReturn={() => {}}>
//   <App/></ErrorBoundary>, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      // console.log('SW registered: ', registration);
    }).catch(registrationError => {
      // console.log('SW registration failed: ', registrationError);
    });
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register({ scope: '/' });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log());
