import React, {useContext} from 'react';
import {Modal} from 'react-bootstrap';
import {ModalContext} from '../../context/modal/ModalContext';
import {useTranslation} from 'react-i18next';
import {Picture} from '../picture/Picture';
import './../form/Form.css';
import './Modal.css';
import {handleInternalServerError} from '../../utils/errorHandler';
import AuthContext from "../../context/auth/AuthContext";

export const InternalError = () => {
  const {modal, setModal} = useContext(ModalContext);
  const authContext = useContext(AuthContext);
  const [t] = useTranslation();

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
    <Modal className='Modal' onHide={() => closeModal()} onExit={() => closeModal()}
           show={modal.internalError} centered id='error'>
      <Modal.Header className='fill-width'>
        <h3 className='fill-width Error'>
          {modal.errorCode === 500 ? 'Internal Error!' : 'You need to login!'}
        </h3>
        <button onClick={() => closeModal()}
                type='button' className='button-error button-icon-footer Close-Button' aria-label='Close'>
          <img src='http://localhost:3000/img/icons/cross.svg' alt='Close icon'/>
        </button>
      </Modal.Header>
      <Modal.Body className='fill-width'>
        <Picture src='http://localhost:3000/img/svg/internal-error.svg' alt='Subscription SVG'
                 imgClassName='SVG-Image-Pop-Up Error-Image'/>
        <h4 className='Error-Text'>
          {modal.errorCode === 500 ? handleInternalServerError(500) : handleInternalServerError(600)}
        </h4>
      </Modal.Body>
      <Modal.Footer className='fill-width'>
        <button className='button button-warning button-small-x-wide' type='button'
                onClick={() => closeModal()}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
