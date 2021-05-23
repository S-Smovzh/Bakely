import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { timer } from 'rxjs';
import i18n from 'i18next';
import activation from '../../../assets/images/svg/activation.svg';
import { ModalContext } from '../../context/modal/ModalContext';
import useWindowDimensions from '../../utils/useWindowDimensions';
import CloseButton from '../button/close/CloseButton';

export default function ActivationModal() {
  const [ t ] = useTranslation();
  const { modal, setModal } = useContext(ModalContext);
  const { height } = useWindowDimensions();

  function closeModal() {
    setModal({
      ...modal,
      activationModal: false,
      notActivated: false
    });

    if (modal.activationModal) {
      timer(100).subscribe(() => {
        history.push({
          pathname: `${i18n.languages[0]}/user/login`,
          isLoggedIn: false
        });
      });
    }
  }

  return (
    <Modal className="Activation Modal J-C-C A-I-C F-W F-H" onHide={() => closeModal()} onExit={() => closeModal()}
      show={modal.activationModal || modal.notActivated} centered>
      <Modal.Header className="F-W">
        <h1 className="T-L h3-size Error">
          {modal.notActivated ? t('modal.activation.notActive.header') : t('modal.activation.activate.header')}
        </h1>
        <CloseButton onClick={() => closeModal()} animate ariaLabel={t('button.close')}/>
      </Modal.Header>
      <Modal.Body className="Flex J-C-F-S A-I-C F-F-C-N F-W">
        {height > 620 ? (
          <img src={activation} alt="" className="SVG-Pop-Up"/>
        ) : null}
        <p className="T-J h6-size">
          {modal.notActivated ? t('modal.activation.notActive.body') : t('modal.activation.activate.body')}
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
