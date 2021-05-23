import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import { timer } from 'rxjs';
import i18n from 'i18next';
import axios from 'axios';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import { PasswordChangeForm } from './homepageForms/PasswordChangeForm';
import CloseButton from '../UI-components/button/close/CloseButton';
import { NextIcon, PrevIcon } from '../UI-components/icons/Icons';
import { toBinary } from '../utils/base64encoder';
import { ModalContext } from '../context/modal/ModalContext';
import useWindowDimensions from '../utils/useWindowDimensions';
import AuthContext from '../context/auth/AuthContext';
import errorHandler from '../utils/errorHandler';
import { logError } from '../error/errorHandler';
import { userLinks } from '../utils/restLinks';
import Head from '../head/Head';
import { TelNumChangeForm } from './homepageForms/TelNumChangeForm';
import { EmailChangeForm } from './homepageForms/EmailChangeForm';
import { AddressForm } from './homepageForms/AddressForm';
import './Homepage.css';

export default function Homepage() {
  let language = i18n.language;
  const { width } = useWindowDimensions();

  const [ t ] = useTranslation();
  const { modal, setModal } = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  const [orders, setOrders] = useState(new Map([]));
  const [orderId, setOrderId] = useState(null);

  const [stateChange, setStateChange] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    if (stateChange) {
      getOrders();
    }
  }, [ stateChange ]);

  useEffect(() => {
    getOrders();
    authContext.checkState();
    if (!localStorage.getItem(btoa('addresses'))) {
      getDeliveryAddresses();
    } else {
      timer(100).subscribe(() => authContext.loadDeliveryAddresses());
    }
  }, []);

  function getOrders() {
    orders.length === 0 && axios.get(userLinks.orders(language),
      {
        headers: {
          Token: typeof window !== 'undefined' &&
            (localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null),
          'Refresh-Token': typeof window !== 'undefined' &&
            (localStorage.getItem(btoa('refreshToken')) ? atob(localStorage.getItem(btoa('refreshToken'))) : null),
          withCredentials: true
        }
      })
      .then(response => {
        const { success, errors, data } = response.data;

        if (success) {
          let ordersTemp = new Map([]);

          for (let i = 0; i < data.length; i++) {
            ordersTemp.set(data[i].id, data[i]);
          }
          setOrders(ordersTemp);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: errors.code
          });
        }
      }).catch((error) => logError(error));
  }

  function getDeliveryAddresses() {
    axios.get(userLinks.deliveryAddresses,
      {
        headers: {
          Token: typeof window !== 'undefined' &&
            (localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null),
          'Refresh-Token': typeof window !== 'undefined' &&
            (localStorage.getItem(btoa('refreshToken')) ? atob(localStorage.getItem(btoa('refreshToken'))) : null),
          withCredentials: true
        }
      }).then(response => {
      const { success, data, errors } = response.data;

      if (success && !errors) {
        localStorage.setItem(btoa('addresses'), toBinary(JSON.stringify(data)));
        authContext.loadDeliveryAddresses();
      } else {
        setModal({
          ...modal,
          internalError: true,
          errorCode: errors.code
        });
      }
    }).catch((error) => logError(error));
  }

  function deleteDeliveryAddress(id) {
    timer(50).subscribe(async () =>
      axios.delete(userLinks.deleteDeliveryAddress(id), {
        headers: {
          Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
          'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
            ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
          withCredentials: true
        }
      })
        .then(response => {
          const { success, errors } = response.data;

          if (success && !errors) {
            authContext.removeDeliveryAddress(id);
            setStateChange(true);
            setTimeout(() => {
              setStateChange(false);
            }, 200);
          } else {
            setModal({
              ...modal,
              internalError: true,
              errorCode: errors.code
            });
          }
        })
        .catch((error) => logError(error))
    );
  }

  function searchOrder() {
    timer(50).subscribe(async () =>
      axios.get(userLinks.searchOrder(keyword), {
        headers: {
          Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
          'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
            ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
          withCredentials: true
        }
      })
        .then((response) => {
          const { success, data, errors } = response.data;

          if (!success && errors) {
            const errors = data.errors;

            if (errors.code === 500 || errors.code === 600) {
              setModal({
                ...modal,
                internalError: true,
                errorCode: errors.code
              });
            } else if (errors.code === 10) {
              setSearchError(errorHandler(errors.code));
            }
          } else {
            setOrders(data);
          }
        }).catch((error) => logError(error))
    );
  }

  const handleSearch = (event) => {
    if (event.target.name === 'search') {
      if (event.target.value.length === 0) {
        getOrders();
      }
      setKeyword(event.target.value);
    }
  };

  return (
    <div className="Home-Page Grid Nunito">
      <Head description={t('homepage.seo.description')} title={t('homepage.seo.title')}/>
      <section id="orders" className="B-T Grid">
        <section className="F-C Grid">
          <header className="Flex J-C-S-A A-I-C T-C F-F-C-N Playfair">
            <h3>{t('homepage.orders.header')}</h3>
          </header>
          <ul className={`Orders-L Flex A-I-C J-C-F-S F-F-C-N helper ${(orders.size % 2) ? 'Even' : 'Odd'}`}>
            <li className="Orders-H Grid F-W">
              <span className="Flex J-C-C A-I-C">{t('date')}</span>
              <span className="Flex J-C-C A-I-C">{t('products')}</span>
              <span className="Flex J-C-C A-I-C">{t('price')}</span>
            </li>
            {orders ? Array.from(orders.values()).map((order) => {
              return (
                <li key={order.date} className="Order Flex J-C-C A-I-C F-W">
                  <button onClick={() => setOrderId(order.id)} type="button"
                    className="Btn Orders-C Grid F-W ">
                    <span className="h6-size">
                      {new Date(Number.parseInt(order.date, 10)).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="h6-size Products">
                      {order.products.map((product, index) =>
                        index !== order.products.length - 1 ? `${product}, ` : `${product}.`
                      )}
                    </span>
                    <span className="h6-size">{order.price}</span>
                  </button>
                </li>
              );
            }) : null}
          </ul>
        </section>
        {orderId ? (
          <section className="S-C">
            <LoadingOverlay
              active={!orders}
              text={t('overlay.loading')}>
              <div className="Flex A-I-C J-C-C F-W F-H">
                <div className="Order-D-T Grid">
                  <div className="Order-Date-R Flex J-C-F-S A-I-C h5-size font-weight_300">
                    {/* eslint-disable-next-line max-len */}
                    {t('homepage.orders.orderData.time')} {new Date(Number.parseInt(orders.get(orderId).date, 10)).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="Prods-Col Grid">
                    <header>
                      <h4 className="font-weight_600">
                        {t('homepage.orders.orderData.products')}
                      </h4>
                    </header>
                    <ul className="Prods-L Flex A-I-F-S F-F-C-N F-W F-H">
                      {orders && orders.get(orderId).products.map((product) => {
                          return <li key={product}>{product}</li>;
                        })}
                    </ul>
                  </div>
                  <div className="Com-C Grid">
                    <div className="O-Com Flex J-C-F-S A-I-C F-F-C-N">
                      <header>
                        <h4 className="font-weight_600">
                          {t('homepage.orders.orderData.comment')}
                        </h4>
                      </header>
                      <p>
                        {orders.get(orderId).comment}
                      </p>
                    </div>
                    <div className="O-Tot">
                      <h4 className="font-weight_600 Flex J-C-S-B A-I-C">
                        <span>{t('homepage.orders.orderData.total')}</span>
                        <span>{orders.get(orderId).price}$</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </LoadingOverlay>
          </section>
          )
          :
          null}
      </section>
      <section className="B-M Grid">
        <section className="F-C Flex A-I-C J-C-C F-F-C-N">
          <header className="Flex J-C-C A-I-C T-C F-W">
            <h3>{t('homepage.addAddress.header')}</h3>
          </header>
          <AddressForm/>
        </section>
        <section className="S-C Grid">
          <header className="Flex A-I-C J-C-C T-C">
            <h3>{t('homepage.deliveryAddresses.header')}</h3>
          </header>
          <ul className={`Addr-T Grid 
          ${(authContext.addresses && authContext.addresses.length % 2 ? 'Even' : 'Odd')}`}>
            {authContext.addresses && authContext.addresses.map((address) => {
              return (
                <li key={address.street + address.flatNum} className="Addr-C Grid F-W">
                  <div className="Content">
                    <span>
                      {`${t('city')} ${address.city},`}
                    </span>
                    <span>
                      {`${t('street')} ${address.street} ${address.houseNum}, ${t('flat')} № ${address.flatNum}.`}
                    </span>
                  </div>
                  <div className="Btn-Rem">
                    <CloseButton onClick={() => deleteDeliveryAddress(address.id)}
                      animate ariaLabel={t('ariaLabel.removeAddress')}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
      <section id="forms" className={`B-B ${width > 999 ? 'Grid' : 'Flex A-I-C J-C-C'}`}>
        {width > 999 ? (
          <React.Fragment>
            <section className="Flex A-I-C J-C-F-E F-F-C-N">
              <header className="F-W T-C">
                <h3>{t('homepage.emailChange.header')}</h3>
              </header>
              <EmailChangeForm/>
            </section>
            <section className="Flex A-I-C J-C-F-E F-F-C-N">
              <header className="F-W T-C">
                <h3>{t('homepage.passwordChange.header')}</h3>
              </header>
              <PasswordChangeForm/>
            </section>
            <section className="Flex A-I-C J-C-F-E F-F-C-N">
              <header className="F-W T-C">
                <h3>{t('homepage.telNumChange.header')}</h3>
              </header>
              <TelNumChangeForm/>
            </section>
          </React.Fragment>
          )
          : (
            <React.Fragment>
              <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch
                interval={1000000000} className="F-W">
                <Carousel.Item>
                  <section className="Flex A-I-C J-C-F-E F-F-C-N">
                    <header className="F-W T-C">
                      <h3>{t('homepage.emailChange.header')}</h3>
                    </header>
                    <EmailChangeForm/>
                  </section>
                </Carousel.Item>
                <Carousel.Item>
                  <section className="Flex A-I-C J-C-F-E F-F-C-N">
                    <header className="F-W T-C">
                      <h3>{t('homepage.passwordChange.header')}</h3>
                    </header>
                    <PasswordChangeForm/>
                  </section>
                </Carousel.Item>
                <Carousel.Item>
                  <section className="Flex A-I-C J-C-F-E F-F-C-N">
                    <header className="F-W T-C">
                      <h3>{t('homepage.telNumChange.header')}</h3>
                    </header>
                    <TelNumChangeForm/>
                  </section>
                </Carousel.Item>
              </Carousel>
            </React.Fragment>
          )}
      </section>
    </div>
  );
}
