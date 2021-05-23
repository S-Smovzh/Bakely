import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import { ModalContext } from '../context/modal/ModalContext';
import { Overlay } from '../UI-components/overlay/Overlay';
import { useTouchDevice } from '../utils/useTouchDevice';
import { Card } from '../UI-components/card/Card';
import { logError } from '../error/errorHandler';
import { publicLinks } from '../utils/restLinks';
import useOnScreen from '../utils/scrollHandler';
import Head from '../head/Head';
import './ShopAll.css';

import (/* webpackChunkName: "prodList", webpackPrefetch: true */ './ProductsList');
import (/* webpackChunkName: "prodPage", webpackPrefetch: true */ './ProductPage');

export default function ShopAll() {
  const [ t ] = useTranslation();
  const [categories, setCategories] = useState([]);
  const { modal, setModal } = useContext(ModalContext);
  const { isTouchDevice } = useTouchDevice();

  const [ elementRef ] = useOnScreen({
    root: null,
    rootMargin: '-40% 0px 0px 0px',
    threshold: 0.1
  }, '30%');

  useEffect(() => {
    getCategories();
  }, [ t ]);

  const getCategories = async () => {
    categories.length === 0 && axios.get(publicLinks.productsCategories(i18n.language))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setCategories(data);
        } else {
          setModal({
            ...modal,
            internalError: false,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  return (
    <LoadingOverlay
      active={categories.length === 0}
      text={t('overlay.loading')}>
      <Head title={t('shopAll.seo.title')} description={t('shopAll.seo.description')}
        cardTitle={t('shopAll.seo.title')} cardDescription={t('shopAll.seo.cardDescription')}
        imgUrl="https://res.cloudinary.com/gachi322/image/upload/v1620396517/Bakely/cards/shop-all_tdn2ze.jpg"
        imgUrlSecure="https://res.cloudinary.com/gachi322/image/upload/v1620396517/Bakely/cards/shop-all_tdn2ze.jpg"
        imgAlt={t('shopAll.seo.imgAlt')} imgType="JPG"
      />
      <div className="Shop-All Grid">
        <header className="B-T Flex J-C-C A-I-C T-C">
          <h1>{t('shopAll.header')}</h1>
        </header>
        <div className="B-M Flex J-C-C A-I-C F-F-C-N Nunito">
          <ul className="Categories Flex J-C-S-A A-I-F-S F-F-R-W" ref={isTouchDevice ? null : elementRef}>
            {categories && categories.map((category) => {
              return (
                <li key={category.name} className="Flex J-C-C A-I-C F-F-C-N T-J">
                  <Card>
                    <Overlay imageName={category.imgSrc} alt={category.imgDescription}
                      type="link" link={`shop/${category.type.toLowerCase()}`}
                      linkClassName="Btn-S Btn-L-X-W h3-size" text={category.name}
                      animationOnHover animationOnClick animationType="bounce"
                      cldI folders="products/categories" imageType="listImage"
                    />
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </LoadingOverlay>
  );
}
