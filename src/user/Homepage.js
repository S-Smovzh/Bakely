import React, {useContext, useEffect, useState} from 'react';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import errorHandler from '../utils/errorHandler';
import './Homepage.css';
import i18n from 'i18next';
import {ModalContext} from "../context/modal/ModalContext";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import AuthContext from "../context/auth/AuthContext";
import CloseButton from "../UI-components/button/close/CloseButton";
import {Helmet} from "react-helmet";
import {userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import {timer} from "rxjs";
import {userConfig} from "../utils/restApiConfigs";
import Head from "../head/Head";
import useWindowDimensions from "../utils/isTouchDevice";
import {AddressForm} from "./homepageForms/AddressForm";
import {PasswordChangeForm} from "./homepageForms/PasswordChangeForm";
import {EmailChangeForm} from "./homepageForms/EmailChangeForm";
import {TelNumChangeForm} from "./homepageForms/TelNumChangeForm";
import {Carousel} from "react-bootstrap";
import {NextIcon, PrevIcon} from "../UI-components/icons/Icons";
import {Search} from "../UI-components/input/search-input/Search";
import {fromBinary, toBinary} from "../utils/base64encoder";

export default function Homepage() {
  let language = i18n.language;
  const {width} = useWindowDimensions();

  const [t] = useTranslation();
  const {modal, setModal} = useContext(ModalContext);
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
  }, [stateChange]);

  useEffect(() => {
    console.log(localStorage.getItem(btoa('addresses')) ? JSON.parse(fromBinary(localStorage.getItem(btoa('addresses')))) : [])

    getOrders();
    authContext.checkState();
    if (!localStorage.getItem(btoa('addresses'))) {
      getDeliveryAddresses();
    } else {
      timer(100).subscribe(() => authContext.loadDeliveryAddresses());
    }
  }, []);

  function getOrders() {
    axios.get(userLinks.orders(language),
      {
        headers: {
          Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
          'Refresh-Token': localStorage.getItem(btoa('refreshToken')) ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
          withCredentials: true
        }
      })
      .then(response => {
        const {success, errors, data} = response.data;
        if (success) {
          let ordersTemp = new Map([]);
          for (let i = 0; i < data.length; i++) {
            ordersTemp.set(data[i].id, data[i])
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
          Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
          'Refresh-Token': localStorage.getItem(btoa('refreshToken')) ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
          withCredentials: true
        }
      }).then(response => {
      const {success, data, errors} = response.data;
      if (success && !errors) {
        localStorage.setItem(btoa('addresses'), toBinary(JSON.stringify(data)));
        authContext.loadDeliveryAddresses();
      } else {
        setModal({
          ...modal,
          internalError: true,
          errorCode: errors.code
        })
      }
    }).catch((error) => logError(error));
  }

  function deleteDeliveryAddress(id) {
    axios.delete(userLinks.deleteDeliveryAddress(id), userConfig)
      .then(response => {
        const {success, errors} = response.data;
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
          })
        }
      })
      .catch((error) => logError(error));
  }

  function searchOrder() {
    axios.get(userLinks.searchOrder(keyword), userConfig)
      .then((response) => {
        const {success, data, errors} = response.data;
        if (!success && errors) {
          const errors = data.errors;
          if (errors.code === 500 || errors.code === 600) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: errors.code
            })
          } else if (errors.code === 10) {
            setSearchError(errorHandler(errors.code));
          }
        } else {
          setOrders(data);
        }
      }).catch((error) => logError(error));
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
      <div className='Homepage Grid Nunito'>
        <Head description={t('seo.homepage.description')} title={t('seo.homepage.title')}/>
        <section id='orders' className='TopBlock Grid'>
          <section className='LeftCol Grid'>
            <header className='Flex J-C-S-A A-I-C T-C F-F-C-N Playfair'>
              <h3>{t('homepage.orders.header')}</h3>
              <div className='Form-Row fill-width'>
                <Search tooltipId='search' inputType='search' inputName='search' autoComplete='off'
                        inputOnBlur={(event) => handleSearch(event)} inputOnChange={(event) => handleSearch(event)}
                        value={keyword} buttonOnClick={() => searchOrder()}/>
              </div>
            </header>
            <ul className={`Orders-List Flex A-I-C J-C-F-S F-F-C-N helper ${(orders.size % 2) ? 'Even' : 'Odd'}`}>
              <li className='Orders-Header Grid fill-width'>
                <span className='Flex J-C-C A-I-C'>{t('date')}</span>
                <span className='Flex J-C-C A-I-C'>{t('products')}</span>
                <span className='Flex J-C-C A-I-C'>{t('price')}</span>
              </li>
              {orders ? Array.from(orders.values()).map((order) => {
                return (
                  <li key={order.date} className='Order Flex J-C-C A-I-C fill-width'>
                    <button onClick={() => setOrderId(order.id)} type='button'
                            className='button Orders-Cell Grid fill-width '>
                      <span
                        className='h6-size'>{new Date(Number.parseInt(order.date)).toLocaleDateString('ru-RU')}</span>
                      <span className='h6-size Products'>
                      {order.products.map((product, index) =>
                        index !== order.products.length - 1 ? `${product}, ` : `${product}.`
                      )}
                    </span>
                      <span className='h6-size'>{order.price}</span>
                    </button>
                  </li>);
              }) : null}
            </ul>
          </section>
          {orderId ?
            <section className='RightCol'>
              <LoadingOverlay
                active={!orders}
                text={t('overlay.getting')}>
                <div className='Flex A-I-C J-C-C fill-width fill-height'>
                  <div className='Order-Data-Table Grid'>
                    <div className='OrderDate-Row Flex J-C-F-S A-I-C h5-size font-weight_300'>
                      {t('homepage.orders.orderData.time')} {new Date(Number.parseInt(orders.get(orderId).date)).toLocaleDateString('ru-RU')}
                    </div>
                    <div className='Products-Column Grid'>
                      <header>
                        <h4 className='font-weight_600'>{t('homepage.orders.orderData.products')}</h4>
                      </header>
                      <ul className='Products-List Flex A-I-F-S F-F-C-N fill-width fill-height'>
                        {orders && orders.get(orderId).products.map((product) => {
                          return <li key={product}>{product}</li>;
                        })}
                      </ul>
                    </div>
                    <div className='Comment-Column Grid'>
                      <div className='Order-Comment Flex J-C-F-S A-I-C F-F-C-N'>
                        <header>
                          <h4 className='font-weight_600'>{t('homepage.orders.orderData.comment')}</h4>
                        </header>
                        <p>
                          {orders.get(orderId).comment}
                        </p>
                      </div>
                      <div className='Order-Total'>
                        <h4 className='font-weight_600 Flex J-C-S-B A-I-C'>
                          <span>{t('homepage.orders.orderData.comment')}</span>
                          <span>{orders.get(orderId).price}$</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </LoadingOverlay>
            </section>
            :
            null}
        </section>
        <section className='MiddleBlock Grid'>
          <section className='LeftCol Flex A-I-C J-C-C F-F-C-N'>
            <header className='Flex J-C-C A-I-C T-C fill-width'>
              <h3>{t('homepage.addAddress.header')}</h3>
            </header>
            <AddressForm/>
          </section>
          <section className='RightCol Grid'>
            <header className='Flex A-I-C J-C-C T-C'>
              <h3>{t('homepage.deliveryAddresses.header')}</h3>
            </header>
            <ul
              className={`Addresses-Table Grid ${(authContext.addresses && authContext.addresses.length % 2 ? 'Even' : 'Odd')}`}>
              {authContext.addresses && authContext.addresses.map((address) => {
                return (
                  <li key={address.street + address.flatNum} className='Addresses-Cell Grid fill-width'>
                    <div className='Content'>
                    <span>
                      {`${t('city')} ${address.city},`}
                    </span>
                      <span>
                      {`${t('street')} ${address.street} ${address.houseNum}, ${t('flat')} № ${address.flatNum}.`}
                    </span>
                    </div>
                    <div className='Remove-Button'>
                      <CloseButton onClick={() => deleteDeliveryAddress(address.id)}
                                   animate={true} ariaLabel={t('ariaLabel.removeAddress')}/>
                    </div>
                  </li>);
              })}
            </ul>
          </section>
        </section>
        <section id='forms' className='BottomBlock Flex J-C-S-B A-I-C'>
          {width > 999 ?
            <React.Fragment>
              <section className='Flex A-I-C J-C-F-E F-F-C-N'>
                <header className='fill-width T-C'>
                  <h3>{t('homepage.emailChange.header')}</h3>
                </header>
                <EmailChangeForm/>
              </section>
              <section className='Flex A-I-C J-C-F-E F-F-C-N'>
                <header className='fill-width T-C'>
                  <h3>{t('homepage.passwordChange.header')}</h3>
                </header>
                <PasswordChangeForm/>
              </section>
              <section className='Flex A-I-C J-C-F-E F-F-C-N'>
                <header className='fill-width T-C'>
                  <h3>{t('homepage.telNumChange.header')}</h3>
                </header>
                <TelNumChangeForm/>
              </section>
            </React.Fragment>
            :
            <React.Fragment>
              <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch={true}
                        interval={1000000000} className='fill-width'>
                <Carousel.Item>
                  <section className='Flex A-I-C J-C-F-E F-F-C-N'>
                    <header className='fill-width T-C'>
                      <h3>{t('homepage.emailChange.header')}</h3>
                    </header>
                    <EmailChangeForm/>
                  </section>
                </Carousel.Item>
                <Carousel.Item>
                  <section className='Flex A-I-C J-C-F-E F-F-C-N'>
                    <header className='fill-width T-C'>
                      <h3>{t('homepage.passwordChange.header')}</h3>
                    </header>
                    <PasswordChangeForm/>
                  </section>
                </Carousel.Item>
                <Carousel.Item>
                  <section className='Flex A-I-C J-C-F-E F-F-C-N'>
                    <header className='fill-width T-C'>
                      <h3>{t('homepage.telNumChange.header')}</h3>
                    </header>
                    <TelNumChangeForm/>
                  </section>
                </Carousel.Item>
              </Carousel>
            </React.Fragment>
          }
        </section>
      </div>
  );
}
