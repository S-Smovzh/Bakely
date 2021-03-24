import React, {useContext, useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import './CateringModal.css';
import axios from 'axios';
import {ModalContext} from '../../context/modal/ModalContext';
import i18n from 'i18next';
import {useLocation} from 'react-router-dom';
import {publicLinks} from "../../utils/restLinks";
import {logError} from "../../error/errorHandler";
import {useTranslation} from "react-i18next";
import CloseButton from "../../UI-components/button/close/CloseButton";

export const CateringModal = () => {
  const {modal, setModal} = useContext(ModalContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [cateringEvent, setCateringEvent] = useState([]);
  const location = useLocation();
  const [t] = useTranslation();

  function getFeedbacks() {
    axios.get(publicLinks.cateringFeedbacks(i18n.language, location.eventId))
      .then(response => {
        const {success, data} = response.data;
        if (success) {
          setFeedbacks(data);
        } else {
          setModal({
            ...modal,
            internalError: true
          });
        }
      }).catch((error) => logError(error));
  }

  function closeModal() {
    setModal({
      ...modal,
      cateringModal: false
    });
  }

  useEffect(() => {
    setCateringEvent(location.data);
    if (location.eventId) {
      getFeedbacks();
    }
  }, [location.eventId, location.data, t]);

  return (
    <Modal className='Modal Catering Nunito'
           onHide={() => closeModal()}
           show={modal.cateringModal}
           centered>
      <Modal.Body className='fill-width'>
        <header className='fill-width'>
          <h1 className='h2-size Playfair'>{cateringEvent && cateringEvent.name}</h1>
          <CloseButton onClick={() => closeModal()} animate={true} ariaLabel={t('aria-label.close')}/>
        </header>
        <p>
          <span className='font-weight_600'>
            {t('catering.gallery.modal.date')}
          </span>
          <p>{cateringEvent && cateringEvent.date}.</p>
        </p>
        <p>
          <span className='font-weight_600'>
            {t('catering.gallery.modal.guests')}
          </span>
          <p>{cateringEvent && cateringEvent.guests}.</p>
        </p>
        <ul className='Feedbacks'>
          {feedbacks && feedbacks.map((feedback) => {
            return (
              <li key={feedback.id}>
                <blockquote className="Quote">
                  {feedback.text}
                  <cite>{`${feedback.firstName} ${feedback.lastName} (${feedback.role})`}</cite>
                </blockquote>
              </li>
            );
          })}
        </ul>
      </Modal.Body>
    </Modal>
  );
};
