import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import i18n from 'i18next';
import axios from 'axios';
import CloseButton from '../../UI-components/button/close/CloseButton';
import { ModalContext } from '../../context/modal/ModalContext';
import { publicLinks } from '../../utils/restLinks';
import { logError } from '../../error/errorHandler';
import './CateringModal.css';

export const CateringModal = () => {
  const { modal, setModal } = useContext(ModalContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [cateringEvent, setCateringEvent] = useState([]);
  const location = useLocation();
  const [ t ] = useTranslation();

  function getFeedbacks() {
    axios.get(publicLinks.cateringFeedbacks(i18n.language, location.eventId))
      .then(response => {
        const { success, data } = response.data;

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
    <Modal className="Modal Flex Catering Nunito"
      onHide={() => closeModal()}
      show={modal.cateringModal}
      centered>
      <Modal.Body className="fill-width Flex J-C-S-B A-I-F-S F-F-C-N">
        <header className="F-W Flex J-C-S-B A-I-C F-F-R-N T-C">
          <h1 className="h2-size Playfair">{cateringEvent && cateringEvent.name}</h1>
          <CloseButton onClick={() => closeModal()} animate ariaLabel={t('aria-label.close')}/>
        </header>
        <p className="Flex J-C-C A-I-C F-F-R-N">
          <span className="font-weight_600">
            {t('catering.gallery.modal.date')}
          </span>
          <span>{cateringEvent && cateringEvent.date}.</span>
        </p>
        <p className="Flex J-C-C A-I-C F-F-R-N">
          <span className="font-weight_600">
            {t('catering.gallery.modal.guests')}
          </span>
          <span>{cateringEvent && cateringEvent.guestsQuantity}.</span>
        </p>
        <ul className="Feedbacks Flex F-F-C-N">
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
