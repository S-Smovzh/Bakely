import React, {useContext, useEffect, useState} from 'react';
import {Overlay} from '../UI-components/overlay/Overlay';
import './ProductsList.css';
import {Link, useLocation} from 'react-router-dom';
import {Card} from '../UI-components/card/Card';
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import axios from "axios";
import {publicLinks} from "../utils/restLinks";
import i18n from "i18next";
import {logError} from "../error/errorHandler";
import {ModalContext} from "../context/modal/ModalContext";
import {useTranslation} from "react-i18next";
import useOnScreen from "../utils/scrollHandler";

export default function ProductsList() {
  const {modal, setModal} = useContext(ModalContext);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [t] = useTranslation();
  const location = useLocation();
  const bars = 'bars';
  const cakes = 'cakes';
  const cheesecakes = 'cheesecakes';
  const cookies = 'cookies';
  const cupcakes = 'cupcakes';
  const giftBoxes = 'gift-boxes';
  const pies = 'pies';
  const path = '/shop/';

  const [elementRef] = useOnScreen({
    root: null,
    rootMargin: '-35% 0px 0px 0px',
    threshold: 0.1
  }, '40%');

  const getProductsByCategory = async (type) => {
    await axios.get(publicLinks.productsByCategory(i18n.language, type))
      .then(response => {
        const {success, data} = response.data;
        if (success) {
          setProducts(data);
        } else {
          setModal({
            ...modal,
            internalError: true
          });
        }
      }).catch((error) => logError(error));
  };

  useEffect(() => {
    switch (location.pathname) {
      case path + bars:
        getProductsByCategory(bars).then(() => {
          setTitle(t('shopAll.bars'));
        });
        break;
      case path + cakes:
        getProductsByCategory(cakes).then(() => {
          setTitle(t('shopAll.cakes'));
        });
        break;
      case path + cheesecakes:
        getProductsByCategory(cheesecakes).then(() => {
          setTitle(t('shopAll.cheesecakes'));
        });
        break;
      case path + cookies:
        getProductsByCategory(cookies).then(() => {
          setTitle(t('shopAll.cookies'));
        });
        break;
      case path + cupcakes:
        getProductsByCategory(cupcakes).then(() => {
          setTitle(t('shopAll.cupcakes'));
        });
        break;
      case path + giftBoxes:
        getProductsByCategory(giftBoxes).then(() => {
          setTitle(t('shopAll.giftBoxes'));
        });
        break;
      case path + pies:
        getProductsByCategory(pies).then(() => {
          setTitle(t('shopAll.pies'));
        });
        break;
    }
  }, [t]);

  return (
    <LoadingOverlay
      active={products.length === 0}
      text={t('overlay.getting')}>
      <div className='Products_List-Page'>
        <header className='TopBlock'>
          <h1>{title}</h1>
        </header>
        <section className='MiddleBlock'>
          <ul className='Products Nunito' ref={elementRef}>
            {products && products.map((product) => {
              const isDiscounted = Number.parseInt(product.discount) > 0;
              return (
                <li key={product.id}>
                  <Link to={location.pathname + '/' + product.id}>
                    <Card>
                      <Overlay src={product.imgSrc} alt={product.imgDescription} type='listImage'>
                        <h2>{product.name}</h2>
                      </Overlay>
                      <div className='Product-Info fill-height'>
                        <p className='Product-Name font-weight_900 h5-size fill-width'>{product.name}</p>
                        <div className='Product-Price fill-width'>
                          <p className='Price-Discount font-weight_600 h4-size error-300 fill-width'>
                            {isDiscounted ? t('productsList.priceDiscounted', {price: product.price * (100 - product.discount) / 100}) : t('productsList.price', {price: product.price})}
                          < /p>
                          {isDiscounted ?
                            <p
                              className='Price font-weight_200 helper crossed fill-width'>
                              {isDiscounted ? t('productsList.oldPrice', {price: product.price}) : null}
                            </p>
                            : null}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </LoadingOverlay>
  );
}
