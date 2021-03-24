import React, {useContext, useEffect, useState} from 'react';
import './Cart.css';
import CartContext from '../context/cart/CartContext';
import {Link} from 'react-router-dom';
import {Picture} from '../UI-components/picture/Picture';
import AuthContext from '../context/auth/AuthContext';
import {ModalContext} from '../context/modal/ModalContext';
import axios from "axios";
import {OrderFormContext} from "../context/orderForm/OrderFormContext";
import {useTranslation} from "react-i18next";
import {OrderForm} from "../order/OrderForm";
import {useSpring, animated, config} from "react-spring";
import {Trail} from "react-spring/renderprops-universal";
import {timer} from "rxjs";
import {Animation} from "../animation/Animation";
import CloseButton from "../UI-components/button/close/CloseButton";
import {clientConfig, userConfig} from "../utils/restApiConfigs";
import {clientLinks, userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";

export const Cart = () => {
    const [total, setTotal] = useState(0);
    const [removing, setRemoving] = useState('');
    const [visibility, setVisibility] = useState('');
    const {orderForm, setOrderForm} = useContext(OrderFormContext);
    const cartContext = useContext(CartContext);
    const authContext = useContext(AuthContext);
    const [t] = useTranslation();
    const {modal, setModal} = useContext(ModalContext);

    const cartAnimation = useSpring({
      transform: cartContext.show ? 'translateX(0)' : 'translateX(100%)'
    });

    useEffect(() => {
      !cartContext.show ? timer(600).subscribe(() => setVisibility('Hidden')) : setVisibility('');
    }, [cartContext.show]);

    useEffect(() => {
      cartContext.loadProducts();
      cartContext.cart.forEach((item) => {
        setTotal(total + item.total);
      })
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
    }, [orderForm.proceedOrder]);

    function addOrderData(type) {
      let url, config;

      const data = {
        total: total,
        comment: orderForm.comment,
        products: cartContext.cart
      }

      switch (type) {
        case 'client':

          break;
        case 'user':

          break;
        default:

          break;
      }
      if (type === 'client') {
        url = clientLinks.cart;
        config = clientConfig;
      } else if (type === 'user') {
        url = userLinks.cart;
        config = userConfig;
      }

      axios.post(url, data, config)
        .then((response) => {
          const {success, errors} = response.data;
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
    }

    function makeOrder() {
      if (authContext.logged) {
        setModal({
          ...modal, usersOrder: true
        });
      } else {
        setModal({
          ...modal, clientsOrder: true
        });
      }
    }

    return (
      <animated.div className={'Cart-Page ' + visibility} style={cartAnimation}>
        <header className='TopBlock fill-width'>
          <h1>
            {cartContext.cart && cartContext.cart.length > 0 ?
              t('cart.header.filled')
              :
              t('cart.header.empty')}
          </h1>
        </header>
        <section className='MiddleBlock Nunito'>
          {cartContext.cart && cartContext.cart.length > 0 ?
            <>
              <ul className='Cart-Products fill-width'>
                <Trail items={cartContext.cart}
                       config={config.gentle}
                       keys={product => product.name}
                       from={{opacity: 0, transform: `translateX(400px)`,}}
                       to={{transform: `translateX(${cartContext.show ? 0 : '400px'})`, opacity: 1}}
                       delay={cartContext.show ? 100 : 0}>
                  {product => props => (
                    <animated.li style={props} key={product.name + product.selectedOption}
                                 className={'Cart-Product fill-width h5-size ' + (removing === product.name ? 'Remove' : '')}>
                      <div className='Product-Data-Wrapper'>
                        <div className='Product-Data helper'>
                          <span className='fill-width'>{product.name}</span>
                          <span className='fill-width'>({product.selectedOption})</span>
                          <span
                            className='fill-width'>{product.total}$ ({product.quantity} {product.quantity > 1 ? 'items' : 'item'})</span>
                        </div>

                        <div className='Product_Quantity'>
                          <button onClick={() => cartContext.increaseQuantity(product)} type='button'
                                  className='button button-primary button-icon-footer'
                                  aria-label={t('aria-label.increase')}>
                            <img alt='' src='http://localhost:3000/img/icons/arrow-down.svg'/>
                          </button>
                          <div className='h6-size' id='quantity'>{product.quantity}</div>
                          <button onClick={() => cartContext.decreaseQuantity(product)} type='button'
                                  className='button button-primary button-icon-footer'
                                  aria-label={t('aria-label.decrease')}>
                            <img alt='' src='http://localhost:3000/img/icons/arrow-down.svg'/>
                          </button>
                        </div>

                        <div className='Remove-Button'>
                          <CloseButton onClick={() => {
                            setRemoving(product.name);
                            timer(300).subscribe(() => {
                              cartContext.removeProductFromCart(product);
                              setRemoving('');
                            });
                          }} animate={true} ariaLabel={t('aria-label.removeItem')}/>
                        </div>
                      </div>

                      <Picture src={product.imgSrc} alt={product.imgDescription} imgClassName='Cart-Item-Image'
                               className='Product-Image'/>
                      <div className='H-Ruler'/>
                    </animated.li>)}
                </Trail>
              </ul>
              <Animation type='bounce' onHover={true} onClick={true} infinite={false}>
                <button onClick={() => makeOrder()}
                        type='button' className='button-success button-small-x-wide' aria-label='Proceed order'>
                  {t('cart.button.order')}
                </button>
              </Animation>
            </>
            :
            <div className='Empty fill-height fill-width'>
              <Picture src='http://localhost:3000/img/svg/empty-cart.svg' imgClassName='listImage' alt='Empty cart'/>
              <Link to='/shop' className='h3-size font-weight_400'>{t('cart.link.shop')}</Link>
            </div>}
        </section>
        <OrderForm/>
      </animated.div>
    );
  }
;
