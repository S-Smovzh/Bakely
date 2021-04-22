import React, {useContext, useEffect, useState} from 'react';
import './ShopAll.css';
import axios from 'axios';
import {Overlay} from '../UI-components/overlay/Overlay';
import {ModalContext} from '../context/modal/ModalContext';
import {Card} from "../UI-components/card/Card";
import {useTranslation} from "react-i18next";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {logError} from "../error/errorHandler";
import {publicLinks} from "../utils/restLinks";
import useOnScreen from "../utils/scrollHandler";
import i18n from "i18next";
import {isTouchDevice} from "../utils/isTouchDevice";

export default function ShopAll() {
  const {modal, setModal} = useContext(ModalContext);
  const [categories, setCategories] = useState([]);
  const [t] = useTranslation();

  const [elementRef] = useOnScreen({
    root: null,
    rootMargin: '-40% 0px 0px 0px',
    threshold: 0.1
  }, '30%');

  useEffect(() => {
    getCategories();
  }, [t]);

  const getCategories = async () => {
    axios.get(publicLinks.productsCategories(i18n.language))
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

  return (
    <LoadingOverlay
      active={categories.length === 0}
      text={t('overlay.getting')}>
      <div className='Shop-All Grid'>
        <header className='TopBlock Flex J-C-C A-I-C T-C'>
          <h1>{t('shopAll.header')}</h1>
        </header>
        <div className='MiddleBlock Flex J-C-C A-I-C F-F-C-N Nunito'>
          <ul className='Categories Flex J-C-S-A A-I-F-S F-F-R-W' ref={isTouchDevice() ? null : elementRef}>
            {categories && categories.map((category) => {
              return (
                <li key={category.name} className='Flex J-C-C A-I-C F-F-C-N T-J'>
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
