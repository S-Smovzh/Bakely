import React, {useContext, useEffect, useState} from 'react';
import './ShopAll.css';
import axios from 'axios';
import {Overlay} from '../UI-components/overlay/Overlay';
import {ModalContext} from '../context/modal/ModalContext';
import i18n from 'i18next';
import {Card} from "../UI-components/card/Card";
import {useTranslation} from "react-i18next";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {logError} from "../error/errorHandler";
import {publicLinks} from "../utils/restLinks";
import useOnScreen from "../utils/scrollHandler";

export default function ShopAll() {
  const [categories, setCategories] = useState([]);
  const {modal, setModal} = useContext(ModalContext);
  const [t] = useTranslation();

  const [elementRef] = useOnScreen({
    root: null,
    rootMargin: '-40% 0px 0px 0px',
    threshold: 0.1
  }, '30%');

  const getCategories = async () => {
    await axios.get(publicLinks.productsCategories(i18n.language))
      .then(response => {
        const {success, data} = response.data;
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

  useEffect(() => {
    getCategories();
  }, [t]);

  return (
    <LoadingOverlay
      active={categories.length === 0}
      text={t('overlay.getting')}>
      <div className='Shop-All'>
        <header className='TopBlock'>
          <h1>{t('shopAll.header')}</h1>
        </header>
        <div className='MiddleBlock Nunito'>
          <ul className='Categories' ref={elementRef}>
            {categories && categories.map((category) => {
              return (
                <li key={category.name}>
                  <Card>
                    <Overlay src={category.imgSrc} alt={category.imgDescription} overlayClass='listImage'
                             imageType='listImage' type='link' link={'/shop/' + category.type.toLowerCase()}
                             linkClassName='button-secondary button-large-x-wide h3-size' text={category.name}
                             animationOnHover={true} animationOnClick={true} animationType='bounce'>
                    </Overlay>
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
