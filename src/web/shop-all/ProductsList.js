import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import { ModalContext } from '../context/modal/ModalContext';
import { Overlay } from '../UI-components/overlay/Overlay';
import { isTouchDevice } from '../utils/isTouchDevice';
import { Card } from '../UI-components/card/Card';
import { publicLinks } from '../utils/restLinks';
import { logError } from '../error/errorHandler';
import useOnScreen from '../utils/scrollHandler';
import Head from '../head/Head';
import './ProductsList.css';

import (/* webpackChunkName: "shopAll", webpackPrefetch: true */ './ShopAll');
import (/* webpackChunkName: "prodPage", webpackPrefetch: true */ './ProductPage');

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [cardUrl, setCardUrl] = useState('');
  const [ t ] = useTranslation();
  const { modal, setModal } = useContext(ModalContext);
  const BARS = 'bars';
  const CAKES = 'cakes';
  const CHEESECAKES = 'cheesecakes';
  const COOKIES = 'cookies';
  const CUPCAKES = 'cupcakes';
  const GIFT_BOXES = 'gift-boxes';
  const PIES = 'pies';
  const path = `/${i18n.language}/shop/`;
  const location = useLocation();

  const [ elementRef ] = useOnScreen({
    root: null,
    rootMargin: '-35% 0px 0px 0px',
    threshold: 0.1
  }, '40%');

  const getProductsByCategory = async (type) => {
    setCategory(type);
    products.length === 0 && await axios.get(publicLinks.productsByCategory(i18n.language, type))
      .then(response => {
        const { success, data } = response.data;

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
      case path + BARS:
        getProductsByCategory(BARS).then(() => {
          setTitle(t('shopAll.bars'));
          setCardUrl('https://res.cloudinary.com/gachi322/image/upload/v1620396523/Bakely/cards/bars_lkmy9p.jpg');
        });
        break;
      case path + CAKES:
        getProductsByCategory(CAKES).then(() => {
          setTitle(t('shopAll.cakes'));
          setCardUrl('https://res.cloudinary.com/gachi322/image/upload/v1620396524/Bakely/cards/cakes_ugq6b4.jpg');
        });
        break;
      case path + CHEESECAKES:
        getProductsByCategory(CHEESECAKES).then(() => {
          setTitle(t('shopAll.cheesecakes'));
          setCardUrl('https://res.cloudinary.com/gachi322/image/upload/v1620396520/Bakely/cards/cheesecakes_cbxihz.jpg');
        });
        break;
      case path + COOKIES:
        getProductsByCategory(COOKIES).then(() => {
          setTitle(t('shopAll.cookies'));
          setCardUrl('https://res.cloudinary.com/gachi322/image/upload/v1620396519/Bakely/cards/cookies_lgtjjd.jpg');
        });
        break;
      case path + CUPCAKES:
        getProductsByCategory(CUPCAKES).then(() => {
          setTitle(t('shopAll.cupcakes'));
          setCardUrl('https://res.cloudinary.com/gachi322/image/upload/v1620396517/Bakely/cards/cupcakes_ilrcdk.jpg');
        });
        break;
      case path + GIFT_BOXES:
        getProductsByCategory(GIFT_BOXES).then(() => {
          setTitle(t('shopAll.giftBoxes'));
          setCardUrl('');
        });
        break;
      case path + PIES:
        getProductsByCategory(PIES).then(() => {
          setTitle(t('shopAll.pies'));
          setCardUrl('https://res.cloudinary.com/gachi322/image/upload/v1620396519/Bakely/cards/pies_upryok.jpg');
        });
        break;
      default:
        getProductsByCategory(BARS).then(() => {
          setTitle(t('shopAll.bars'));
          setCardUrl('https://res.cloudinary.com/gachi322/image/upload/v1620396523/Bakely/cards/bars_lkmy9p.jpg');
        });
        break;
    }
  }, [ t ]);

  return (
    <LoadingOverlay
      active={products.length === 0}
      text={t('overlay.loading')}>
      <Head title={`${t('productsList.seo.title', { category: category })}`} description={t('productsList.seo.description')}
        cardTitle={`${t('productsList.seo.title', { category: category })}`}
        cardDescription={t('productsList.seo.cardDescription')} imgUrl={cardUrl} imgUrlSecure={cardUrl}
        imgAlt={t('productsList.category')} imgType="JPG"
      />
      <div className="Prods-L-Page Grid">
        <header className="B-T Flex J-C-C A-I-C T-C">
          <h1>{title}</h1>
        </header>
        <section className="B-M Flex J-C-C A-I-C F-F-C-N">
          <ul className="Prods Nunito Flex J-C-S-A A-I-F-S F-F-R-W" ref={isTouchDevice() ? null : elementRef}>
            {products && products.map((product) => {
              const isDiscounted = Number.parseInt(product.discount, 10) > 0;

              return (
                <li key={product.id} className="Flex J-C-C A-I-C F-F-C-N">
                  <Link to={location.pathname + '/' + product.id}>
                    <Card className="Grid Image-L-Con">
                      <Overlay cldI folders={`products/${category}`} imageName={product.imgSrc}
                        imageType="listImage" alt={product.imgDescription}>
                        <h2>{product.name}</h2>
                      </Overlay>
                      <div className="It-Inf Flex A-I-C J-C-S-B F-F-C-N T-C F-H">
                        <p className="Product-Name font-weight_900 h5-size F-W">{product.name}</p>
                        <div className="Prod-Pr Grid F-W">
                          <p className="Flex A-I-C J-C-C font-weight_600 h4-size error-300 F-W">
                            {isDiscounted
                              ? t('productsList.price', { price: product.price * (100 - product.discount) / 100 })
                              : t('productsList.price', { price: product.price })}
                          </p>
                          {isDiscounted ? (
                            <p
                              className="Flex A-I-C J-C-C font-weight_300 helper Crossed F-W">
                              {isDiscounted ? t('productsList.oldPrice', { price: product.price }) : null}
                            </p>
                            )
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
