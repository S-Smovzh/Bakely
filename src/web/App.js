import React, { useEffect, useState } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
// import loadable from '@loadable/component';
import axios from 'axios';
import { NotificationOverlayContext } from './context/notification-overlay/NavbarMenuContext';
import { NavbarMenuContext } from './context/navbar-menu/NavbarMenuContext';
import { OrderFormContext } from './context/orderForm/OrderFormContext';
// import { LoadingFallback } from './lazy-loaders/LoadingFallback';
import { logError } from './error/errorHandler';
import { ModalContext } from './context/modal/ModalContext';
import { ToastContext } from './context/toast/ToastContext';
import { FrameContext } from './context/frame/FrameContext';
import ErrorBoundary from './error/ErrorBoundary';
import CartState from './context/cart/CartState';
import AuthState from './context/auth/AuthState';
import { clientLinks } from './utils/restLinks';
import i18n from './utils/i18n';
import Bakely from './Bakely';

// SSR
// loadable.lib(() => import('react-bootstrap/dist/react-bootstrap.min'));
//
// const ActivationModal = loadable(() =>
//   import(/* webpackChunkName: "activationModal", webpackPrefetch: true */ './UI-components/modal/ActivationModal'), {
//   fallback: <LoadingFallback/>
// });
// const CateringModal = loadable(() =>
//   import(/* webpackChunkName: "cateringModal", webpackPrefetch: true */ './catering/modal/CateringModal'), {
//   fallback: <LoadingFallback/>
// });
// const ErrorModal = loadable(() =>
//   import(/* webpackChunkName: "errorModal", webpackPrefetch: true */ './UI-components/modal/ErrorModal'), {
//   fallback: <LoadingFallback/>
// });

export default function App() {
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
    showSubscription: typeof window !== 'undefined' ? (atob(localStorage.getItem(btoa('subscriptionShow'))) === 'true'
      || localStorage.getItem(btoa('subscriptionShow')) === null) : null,
    showCookie: typeof window !== 'undefined' ?
      (atob(localStorage.getItem(btoa('cookies'))) === 'true' || localStorage.getItem(btoa('cookies')) === null) : null,
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

  const [frame, setFrame] = useState({
    frame: {}
  });
  const frameValue = { frame, setFrame };

  useEffect(() => {
    createClientsSession();
    // sendErrorReport();
  }, []);

  function createClientsSession() {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem(btoa('clientsToken'))) {
        axios.get(clientLinks.createSession)
          .then((response) => {
            const { success, body } = response.data;

            if (success) {
              localStorage.setItem(btoa('clientsToken'), btoa(JSON.stringify(body[0].token)));
            }
          }).catch((error) => logError(error));
      }
    }
  }

  return (
    <ErrorBoundary handleReturn={() => history.push({ pathname: `/${i18n.language}` })}>
      <BrowserRouter>
        <CloudinaryContext cloudName={process.env.CLOUDINARY_CLOUD}>
          <I18nextProvider i18n={i18n}>
            <NotificationOverlayContext.Provider value={overlayValue}>
              <ModalContext.Provider value={modalValue}>
                <ToastContext.Provider value={toastValue}>
                  <NavbarMenuContext.Provider value={navbarValue}>
                    <OrderFormContext.Provider value={orderFormValue}>
                      <FrameContext.Provider value={frameValue}>
                        <CartState>
                          <AuthState>
                            <Bakely/>
                          </AuthState>
                        </CartState>
                      </FrameContext.Provider>
                    </OrderFormContext.Provider>
                  </NavbarMenuContext.Provider>
                </ToastContext.Provider>
              </ModalContext.Provider>
            </NotificationOverlayContext.Provider>
          </I18nextProvider>
        </CloudinaryContext>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
