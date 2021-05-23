import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { handleInternalServerError } from '../../utils/errorHandler';
import { ModalContext } from '../../context/modal/ModalContext';
import useWindowDimensions from '../../utils/useWindowDimensions';
import AuthContext from '../../context/auth/AuthContext';
import error from '../../../assets/images/svg/internal-error.svg';
import CloseButton from '../button/close/CloseButton';

export default function ErrorModal() {
  const [ t ] = useTranslation();
  const { modal, setModal } = useContext(ModalContext);
  const authContext = useContext(AuthContext);
  const { height } = useWindowDimensions();

  function closeModal() {
    if (modal.errorCode === 600) {
      authContext.logout();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('clientsToken');
      }
    }

    setModal({
      ...modal,
      internalError: false,
      errorCode: null
    });
    if (modal.errorCode === 600) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }

  return (
    <Modal className="Error-Modal Modal F-W F-H" onHide={() => closeModal()} onExit={() => closeModal()}
      show={modal.internalError} centered>
      <Modal.Header className="F-W">
        <h1 className="T-L h3-size Error">
          {modal.errorCode === 600 ? t('error.header.login') : ''}
          {modal.errorCode === 500 ? t('error.header.internal') : ''}
          {modal.errorCode === 50 ? t('error.header.tooManyLogins') : ''}
        </h1>
        <CloseButton onClick={() => closeModal()} animate ariaLabel={t('ariaLabel.close')}/>
      </Modal.Header>
      <Modal.Body className="Flex J-C-S-B A-I-C F-F-C-N F-W">
        {height > 620 ? (
          <img src={error} alt="" className="SVG-Pop-Up"/>
        ) : null}
        <p className="T-C h5-size">
          {modal.errorCode === 600 ? handleInternalServerError(600) : ''}
          {modal.errorCode === 500 ? handleInternalServerError(500) : ''}
          {modal.errorCode === 50 ? handleInternalServerError(50) : ''}
        </p>
      </Modal.Body>
      <Modal.Footer className="Flex J-C-C A-I-C F-W">
        <button className="Btn Btn-W Btn-Sm-X-W" type="button"
          onClick={() => closeModal()}>
          {t('button.close')}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
