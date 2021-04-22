import React, {useContext} from 'react';
import {Modal} from 'react-bootstrap';
import {ModalContext} from '../../context/modal/ModalContext';
import {useTranslation} from 'react-i18next';
import {Picture} from '../picture/Picture';
import './../form/Form.css';
import './Modal.css';
import {handleInternalServerError} from '../../utils/errorHandler';
import AuthContext from "../../context/auth/AuthContext";
import CloseButton from "../button/close/CloseButton";

export const ErrorModal = () => {
  const {modal, setModal} = useContext(ModalContext);
  const authContext = useContext(AuthContext);
  const [t] = useTranslation(); //TODO

  function closeModal() {
    if (modal.errorCode === 600) {
      authContext.logout();
    }

    setModal({
      ...modal,
      internalError: false,
      errorCode: null
    });
  }

  return (
    <Modal className='Error-Modal Modal fill-width fill-height' onHide={() => closeModal()} onExit={() => closeModal()}
           show={modal.internalError} centered id='error'>
      <Modal.Header className='fill-width'>
        <h1 className='T-L h3-size Error'>
          {modal.errorCode === 500 ? t('error.internal.header') : t('error.login.header')}
        </h1>
        <CloseButton onClick={() => closeModal()} animate={true} ariaLabel={t('button.close')}/>
      </Modal.Header>
      <Modal.Body className='Flex J-C-S-B A-I-C F-F-C-N fill-width'>
        <Picture src='http://localhost:3000/img/svg/internal-error.svg' alt=''
                 imgClassName='SVG-Image'/>
        <p className='T-C h5-size'>
          {modal.errorCode === 500 ? handleInternalServerError(500) : handleInternalServerError(600)}
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
