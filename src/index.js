import React, {useEffect, useRef, useState} from 'react';
import {render} from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {BrowserRouter} from 'react-router-dom';
import './css/base/Colors.css';
import './css/base/Effects.css';
import './css/base/App.css';
import './UI-components/button/Button.css';
import './UI-components/navbar/Navbar.css';
import './UI-components/footer/Footer.css';
import './UI-components/modal/Modal.css';
import './UI-components/form/Form.css';
import Bakely from './App';
import './utils/i18n';
import {ModalContext} from './context/modal/ModalContext';
import {Subscribe} from './UI-components/toasts/components/Subscribe';
import {ErrorModal} from './UI-components/modal/ErrorModal';
import {CateringModal} from './catering/modal/CateringModal';
import axios from 'axios';
import CartState from './context/cart/CartState';
import AuthState from './context/auth/AuthState';
import {OrderFormContext} from "./context/orderForm/OrderFormContext";
import {ToastContext} from "./context/toast/ToastContext";
import {delay} from "rxjs/operators";
import {Cart} from "./cart/Cart";
import {HoverTooltip} from "./UI-components/tooltip/HoverTooltip";
import {Cookie} from "./UI-components/toasts/components/Cookie";
import {Verification} from "./UI-components/toasts/components/Verification";
import {logError} from "./error/errorHandler";
import './css/index.scss';
import {NavbarMenuContext} from "./context/navbar-menu/NavbarMenuContext";
import {Menu} from "./UI-components/navbar/Menu";
import NotificationButton from "./UI-components/button/notification/NotificationButton";
import useWindowDimensions from "./utils/isTouchDevice";
import {NotificationOverlayContext} from "./context/notification-overlay/NavbarMenuContext";

function App() {
  const toastRef = useRef(null);
  const {width} = useWindowDimensions();

  const [modal, setModal] = useState({
    cateringModal: false,
    locationModal: false,
    internalError: false,
    errorCode: 0,
    clientsOrder: false,
    usersOrder: false
  });
  const modalValue = {modal, setModal};

  const [toast, setToast] = useState({
    showSubscription: atob(localStorage.getItem('subscriptionShow')) === 'true' || localStorage.getItem('subscriptionShow') === null,
    showCookie: atob(localStorage.getItem('cookies')) === 'true' || localStorage.getItem('cookies') === null,
    hoverTipShow: false,
    tipTop: '70%',
    verified: false
  });
  const toastValue = {toast, setToast};

  const [navbar, setNavbar] = useState({
    show: false
  });
  const navbarValue = {navbar, setNavbar};

  const [overlay, setOverlay] = useState({
    show: 2
  });
  const overlayValue = {overlay, setOverlay};

  const [orderForm, setOrderForm] = useState({
    delivery: false,
    selfPickUp: false,
    proceedOrder: false,
    bakery: '',
    comment: ''
  });
  const orderFormValue = {orderForm, setOrderForm};

  useEffect(() => {
    createClientsSession();
  }, []);

  function createClientsSession() {
    if (!localStorage.getItem('clientsToken')) {
      axios.post(
        'http://localhost:5000/api/protected/client/auth/create-session',
        {}
      ).then((response) => {
        const {success, body} = response.data;

        if (success) {
          localStorage.setItem('clientsToken', JSON.stringify(body[0].token));
        }
      }).catch((error) => logError(error));
    }
  }

  useEffect(() => {
    if (overlay.show !==2) {
      if (overlay.show) {
        document.getElementById('root').classList.add('BlockScroll');
      } else {
        document.getElementById('root').classList.remove('BlockScroll');
      }
    }
  }, [overlay.show])

  return (
    <BrowserRouter>
      <NotificationOverlayContext.Provider value={overlayValue}>
        <ModalContext.Provider value={modalValue}>
          <ToastContext.Provider value={toastValue}>
            <NavbarMenuContext.Provider value={navbarValue}>
              <OrderFormContext.Provider value={orderFormValue}>
                <CartState>
                  <AuthState>
                    <div className={'Playfair base ' + (modal.modal ? 'BlockScroll ' : '')}>
                      <Menu/>
                      {width < 1851 &&
                      <NotificationButton>
                        <div ref={toastRef} className='Toasts-Stack Small-Device'>
                          {toast.showCookie ?
                            <Cookie/>
                            : null}
                          {localStorage.getItem('cookies') && atob(localStorage.getItem('cookies')) === 'false'
                            ?
                            delay(6000) && <Subscribe/>
                            : null}
                          {toast.verified ?
                          <Verification/>
                          : null}
                        </div>
                      </NotificationButton>}
                      <Bakely/>
                      <Cart/>
                      <HoverTooltip/>
                      <ErrorModal/>
                      <CateringModal/>
                      {width > 1850 ?
                        <div className='Toasts-Stack'>
                          <Cookie/>
                          {localStorage.getItem('cookies') && atob(localStorage.getItem('cookies')) === 'false'
                            ?
                            delay(6000) && <Subscribe/>
                            : null}
                          <Verification/>
                        </div>
                        : null}
                    </div>
                  </AuthState>
                </CartState>
              </OrderFormContext.Provider>
            </NavbarMenuContext.Provider>
          </ToastContext.Provider>
        </ModalContext.Provider>
      </NotificationOverlayContext.Provider>
    </BrowserRouter>
  );
}

render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({ scope: "/"});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log());
