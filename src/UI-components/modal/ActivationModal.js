import React, {useContext} from 'react';
import {Modal} from 'react-bootstrap';
import {ModalContext} from '../../context/modal/ModalContext';
import {useTranslation} from 'react-i18next';
import {Picture} from '../picture/Picture';
import './Modal.css';
import CloseButton from "../button/close/CloseButton";

export const ActivationModal = () => {
  const {modal, setModal} = useContext(ModalContext);
  const [t] = useTranslation();

  function closeModal() {
    setModal({
      ...modal,
      activationModal: false,
      notActivated: false,
      errorCode: null
    });
  }

  return (
    <Modal className='Activation Modal J-C-C A-I-C fill-width fill-height' onHide={() => closeModal()} onExit={() => closeModal()}
           show={modal.activationModal} centered id='error'>
      <Modal.Header className='fill-width'>
        <h1 className='T-L h3-size Error'>
          {modal.notActivated ? t('modal.activation.notActive.header') : t('modal.activation.activate.header')}
        </h1>
        <CloseButton onClick={() => closeModal()} animate={true} ariaLabel={t('button.close')}/>
      </Modal.Header>
      <Modal.Body className='Flex J-C-S-B A-I-C F-F-C-N fill-width'>
        <Picture src='http://localhost:3000/img/svg/activation.svg' alt=''
                 imgClassName='SVG-Image'/>
        <p className='T-J h6-size'>
          {modal.notActivated ? t('modal.activation.notActive.body') : t('modal.activation.activate.body')}
        </p>
      </Modal.Body>
      <Modal.Footer className='Flex J-C-C A-I-C fill-width'>
        <button className='button button-warning button-small-x-wide' type='button'
                onClick={() => closeModal()}>
          {t('close')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
