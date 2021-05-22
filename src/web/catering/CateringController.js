import React, { lazy, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { ModalContext } from '../context/modal/ModalContext';
import { publicLinks } from '../utils/restLinks';
import { logError } from '../error/errorHandler';
import './gallery/CateringGallery.css';

import (/* webpackChunkName: "catering", webpackPrefetch: true */ './Catering');
const CateringGallery = lazy(() =>
  import(/* webpackChunkName: "cateringGallery", webpackPrefetch: true */ './gallery/CateringGallery')
);

export default function CateringController() {
  const [component, setComponent] = useState(null);
  const [ t ] = useTranslation();
  const { modal, setModal } = useContext(ModalContext);
  const location = useLocation();

  useEffect(() => {
    const path = `/${i18n.language}/catering/gallery/`;

    if (location.pathname === path + 'wedding') {
      getWeddings();
    } else if (location.pathname === path + 'celebration') {
      getCelebrations();
    } else if (location.pathname === path + 'corporate') {
      getCorporates();
    } else if (location.pathname === `/${i18n.language}/gallery`) {
      getAll();
    }
  }, [ t ]);

  const getAll = async () => {
    await axios.get(publicLinks.cateringGallery(i18n.language))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setComponent(<CateringGallery data={data && data} type="all"/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  const getWeddings = async () => {
    await axios.get(publicLinks.weddings(i18n.language))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setComponent(<CateringGallery data={data && data} type="wedding"/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  const getCelebrations = async () => {
    await axios.get(publicLinks.celebrations(i18n.language))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setComponent(<CateringGallery data={data && data} type="celebration"/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  const getCorporates = async () => {
    await axios.get(publicLinks.corporates(i18n.language))
      .then(response => {
        const { success, data } = response.data;

        if (success) {
          setComponent(<CateringGallery data={data && data} type="corporate"/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  return (
    <React.Fragment>
      {component}
    </React.Fragment>
  );
}
