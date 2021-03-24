import React, {useContext, useEffect, useState} from 'react';
import './gallery/CateringGallery.css';
import axios from 'axios';
import CateringGallery from './gallery/CateringGallery';
import i18n from 'i18next';
import {ModalContext} from '../context/modal/ModalContext';
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {publicLinks} from "../utils/restLinks";

export default function CateringController() {

  const [component, setComponent] = useState(null);
  const [t] = useTranslation();
  const {modal, setModal} = useContext(ModalContext);
  const location = useLocation();

  useEffect(() => {
    const path = '/catering/gallery/';
    const lang = i18n.language;

    if (location.pathname === path + 'wedding') {
      getWeddings(lang);
    } else if (location.pathname === path + 'celebration') {
      getCelebrations(lang);
    } else if (location.pathname === path + 'corporate') {
      getCorporates(lang);
    } else if (location.pathname === '/gallery') {
      getAll(lang);
    }
  }, [t]);

  const getAll = async (language) => {
    await axios.get(publicLinks.cateringGallery(language))
      .then(response => {
        const {success, data} = response.data;
        if (success) {
          setComponent(<CateringGallery data={data && data} type='all'/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => console.log(error));
  };

  const getWeddings = async (language) => {
    await axios.get(publicLinks.weddings(language))
      .then(response => {
        const {success, data} = response.data;
        if (success) {
          setComponent(<CateringGallery data={data && data} type='wedding'/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => console.log(error));
  };

  const getCelebrations = async (language) => {
    await axios.get(publicLinks.celebrations(language))
      .then(response => {
        const {success, data} = response.data;
        if (success) {
          setComponent(<CateringGallery data={data && data} type='celebration'/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => console.log(error));
  };

  const getCorporates = async (language) => {
    await axios.get(publicLinks.corporates(language))
      .then(response => {
        const {success, data} = response.data;
        if (success) {
          setComponent(<CateringGallery data={data && data} type='corporate'/>);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {component}
    </React.Fragment>
  );
}
