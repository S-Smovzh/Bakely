import React, { useContext, useEffect, useState } from 'react';
import { Trail, animated, config } from 'react-spring';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
import i18n from 'i18next';
import axios from 'axios';
import { OrderFormContext } from '../context/orderForm/OrderFormContext';
import { CloudinaryImage } from '../UI-components/image/CloudinaryImage';
import CloseButton from '../UI-components/button/close/CloseButton';
import arrowDown from '../../assets/images/icons/arrow-down.svg';
import emptyCart from '../../assets/images/svg/empty-cart.svg';
import { ModalContext } from '../context/modal/ModalContext';
import { clientLinks, userLinks } from '../utils/restLinks';
import { LoadableOrder } from '../lazy-loaders/LazyLoaders';
import useWindowDimensions from '../utils/useWindowDimensions';
import { clientConfig } from '../utils/restApiConfigs';
import useOutsideClick from '../utils/useOutsideClick';
import CartContext from '../context/cart/CartContext';
import AuthContext from '../context/auth/AuthContext';
import { Animation } from '../UI-components/animation/Animation';
import { logError } from '../error/errorHandler';
import './Cart.css';

export const Cart = () => {
    const [ t ] = useTranslation();
    const [total, setTotal] = useState(0);
    const [firstRender, setFirstRender] = useState(true);
    const [removing, setRemoving] = useState('');
    const [visibility, setVisibility] = useState('');
    const [showOrderForm, setShowOrderForm] = useState(false);
    const cartContext = useContext(CartContext);
    const [ elementRef ] = useOutsideClick('cart-button', () => cartContext.showCart(false));
    const { orderForm, setOrderForm } = useContext(OrderFormContext);
    const { modal, setModal } = useContext(ModalContext);
    const { width } = useWindowDimensions();
    const authContext = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
      timer(400).subscribe(() => setFirstRender(false));
    }, []);

    useEffect(() => cartContext.showCart(false), [ location ]);

    useEffect(() => {
      // eslint-disable-next-line no-unused-expressions
      if (!firstRender && !cartContext.show) {
        timer(600).subscribe(() => setVisibility('Hidden None'));
      } else {
        setVisibility('Grid');
      }
    }, [cartContext.show, firstRender]);

    useEffect(() => {
      cartContext.loadProducts();
      cartContext.cart.forEach((item) => {
        setTotal(total + item.total);
      });
    }, []);

    useEffect(() => {
      authContext.checkState();
      if (orderForm.proceedOrder) {
        if (authContext.logged) {
          addOrderData('user');
        } else {
          addOrderData('client');
        }
      }
    }, [ orderForm.proceedOrder ]);

    function addOrderData(type) {
      let url;

      let config;

      const data = {
        total: total,
        comment: orderForm.comment,
        products: cartContext.cart
      };

      switch (type) {
        case 'client':
          url = clientLinks.cart;
          config = clientConfig;
          break;
        case 'user':
          url = userLinks.cart;
          config = {
            headers: {
              Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
              'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
                ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
              withCredentials: true
            }
          };
          break;
        default:
          url = clientLinks.cart;
          config = clientConfig;
          break;
      }

      timer(50).subscribe(async () =>
        axios.post(url, data, config)
          .then((response) => {
            const { success, errors } = response.data;

            if (!success && errors) {
              if (errors.code === 500 || errors.code === 600) {
                setModal({
                  ...modal, internalError: true,
                  errorCode: errors.code
                });
              }
            } else {
              setModal({
                ...modal,
                clientsOrder: false,
                usersOrder: false
              });

              setOrderForm({
                delivery: false,
                selfPickUp: false,
                proceedOrder: false,
                bakery: '',
                comment: ''
              });

              cartContext.clearCart();
            }
          }).catch((error) => logError(error))
      );
    }

    function makeOrder() {
      setShowOrderForm(true);
      timer(200).subscribe(() => {
        if (authContext.logged) {
          setModal({
            ...modal, usersOrder: true
          });
        } else {
          setModal({
            ...modal, clientsOrder: true
          });
        }
      });
    }

    return (
      <animated.div ref={elementRef}
        className={`Cart-Page ${firstRender ? 'None' : (cartContext.show ? 'Show-C' : 'Hide-C')} ${visibility}`}>
        <header className={`B-T Flex J-C-C A-I-C ${(width < 769 ? 'Small-Device' : '')}`}>
          <h1 className="h3-size">
            {t('cart.header.filled')}
          </h1>
          {width < 769 ? (
            <button className="Btn-S Btn-Sm-A-W"
              onClick={() => cartContext.showCart(false)} aria-label={t('navbar.ariaLabel.closeMenu')}>
              {t('button.close')}
            </button>
            )
            : null}
        </header>
        <section className="B-M Flex J-C-S-B A-I-C F-F-C-N Nunito">
          {cartContext.cart && cartContext.cart.length > 0 ? (
            <>
              <ul className="Cart-Pr Flex J-C-S-B A-I-C F-F-C-N F-W">
                <Trail force items={cartContext.cart}
                  config={config.gentle}
                  keys={product => product.name + product.selectedOption}
                  from={{ opacity: 0, transform: 'translateX(400px)' }}
                  to={{ transform: `translateX(${cartContext.show ? 0 : '400px'})`, opacity: 1 }}
                  delay={cartContext.show ? 100 : 0}>
                  {/* eslint-disable-next-line react/display-name */}
                  {product => props => (
                    <animated.li style={props} key={product.name + product.selectedOption}
                      className={'Cart-It Grid h5-size ' + (removing === product.name ? 'Remove' : '')}>
                      <div className="Grid Item-D">
                        <div className="Flex J-C-F-S F-F-C-N helper">
                          <span className="F-W">{product.name}</span>
                          <span className="F-W">({product.selectedOption})</span>
                          <span className="F-W">{product.total}$ ({product.quantity}
                            {product.quantity > 1 ? t('items') : t('item')})
                          </span>
                        </div>

                        <div className="Item-Qu Flex J-C-F-S A-I-C F-F-C-N">
                          <button onClick={() => cartContext.increaseQuantity(product)} type="button"
                            className="Btn Btn-P Btn-I"
                            aria-label={t('aria-label.increase')}>
                            <img className="Icon" alt="" src={arrowDown}/>
                          </button>
                          <div className="Flex J-C-C A-I-C T-C h6-size" id="qu">{product.quantity}</div>
                          <button onClick={() => cartContext.decreaseQuantity(product)} type="button"
                            className="Btn Btn-P Btn-I"
                            aria-label={t('aria-label.decrease')}>
                            <img className="Icon" alt="" src={arrowDown}/>
                          </button>
                        </div>

                        <div className="Btn-Rem">
                          <CloseButton
                            onClick={() => {
                                setRemoving(product.name);
                                timer(300).subscribe(() => {
                                  cartContext.removeProductFromCart(product);
                                  setRemoving('');
                                });
                              }}
                            animate
                            ariaLabel={t('aria-label.removeItem')}
                          />
                        </div>
                      </div>

                      <div className="Item-Im">
                        <div className="Cart-Item-Image Flex J-C-C A-I-C">
                          <CloudinaryImage imageName={product.imgSrc} alt={product.imgDescription}
                            imageWidth={72} imageHeight={72} folders={`products/${product.type}`}
                          />
                        </div>
                      </div>
                      {width > 768 ? <div className="H-Ruler"/> : null}
                    </animated.li>
                    )}
                </Trail>
              </ul>
            </>
            )
            : (
              <div className="Flex J-C-S-B A-I-C F-F-C-N F-H F-W">
                <img src={emptyCart} className="Image-L" alt="Empty cart"/>
                <Link to={`/${i18n.language}/shop`} className="h3-size font-weight_300">{t('cart.link.shop')}</Link>
              </div>
            )}
        </section>
        {cartContext.cart.length > 0 ? (
          <div className="Flex J-C-C A-I-C">
            <Animation type="bounce" onHover onClick
              infinite={false}>
              <button onClick={() => makeOrder()}
                type="button" className="Btn-Su Btn-Sm-X-W" aria-label={t('placeOrder')}>
                {t('cart.button.order')}
              </button>
            </Animation>
          </div>
          )
          : null}
        {showOrderForm && <LoadableOrder/>}
      </animated.div>
    );
  }
;
