import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { OrderFormContext } from '../context/orderForm/OrderFormContext';
import { ModalContext } from '../context/modal/ModalContext';
import AuthContext from '../context/auth/AuthContext';
import { Animation } from '../UI-components/animation/Animation';
import { IntroductionPage } from './IntroductionPage';
import { OptionPage } from './DeliveryOptionPage';
import { SelfPickUpPage } from './SelfPickUpPage';
import { ContactDataPage } from './ContactData';
import { DeliveryPage } from './DeliveryPage';
import { SuccessPage } from './SuccessPage';
import './OrderFrom.css';

export default function OrderForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const { modal, setModal } = useContext(ModalContext);
  const { orderForm, setOrderForm } = useContext(OrderFormContext);
  const authContext = useContext(AuthContext);

  function closeModal() {
    setModal({
      ...modal,
      clientsOrder: false,
      usersOrder: false
    });

    setOrderForm({
      ...orderForm,
      delivery: currentPage === 5 ? false : orderForm.delivery,
      selfPickUp: currentPage === 5 ? false : orderForm.selfPickUp,
      proceedOrder: currentPage === 5,
      bakery: ''
    });

    setCurrentPage(1);
  }

  useEffect(() => {
    if (modal.usersOrder) {
      if (currentPage === 1 || currentPage === 2) {
        setCurrentPage(3);
      }
    }
  }, [ modal ]);

  function _next() {
    setCurrentPage(currentPage < 5 ? currentPage + 1 : null);
  }

  function _prev() {
    setCurrentPage(currentPage - 1);
  }

  return (
    // eslint-disable-next-line max-len
    <Modal className={`Modal Order-Form Flex J-C-C A-I-C ${currentPage === 1 ? 'Introduction' : ''} ${currentPage === 2 ? 'Contact' : ''} ${currentPage === 3 ? 'Option' : ''} ${(currentPage === 4 && orderForm.delivery) ? 'Delivery' : ''} ${(currentPage === 4 && orderForm.selfPickUp) ? 'SelfPickUp' : ''} ${currentPage === 5 ? 'Success' : ''}`}
      onHide={() => closeModal()}
      show={(authContext.logged && modal.usersOrder) || modal.clientsOrder}
      backdrop="static"
      keyboard
      centered>
      <Modal.Body className="F-W">
        <div className="F-H">
          {modal.clientsOrder ? (
            <React.Fragment>
              <IntroductionPage page={currentPage} next={_next} closeModal={closeModal}/>
              <ContactDataPage page={currentPage} next={_next} closeModal={closeModal}/>
            </React.Fragment>
          )
          : null}
          <OptionPage page={currentPage} type={!authContext.logged ? 'client' : null} next={_next}
            closeModal={closeModal}
          />
          <SelfPickUpPage page={currentPage} next={_next} prev={_prev}
            closeModal={closeModal}
          />
          <DeliveryPage page={currentPage} type={!authContext.logged ? 'client' : null} next={_next}
            prev={_prev} closeModal={closeModal}
          />
          <SuccessPage page={currentPage} next={closeModal} closeModal={closeModal}/>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const NavigationButtons = ({
  displayNext,
  displayPrev,
  nextButtonAnimation,
  nextButtonDisabled,
  nextOnClickAction,
  nextButtonText,
  prevOnClickAction,
  page
}) => {
  NavigationButtons.propTypes = {
    displayNext: PropTypes.bool,
    displayPrev: PropTypes.bool,
    nextButtonAnimation: PropTypes.string,
    nextButtonDisabled: PropTypes.bool,
    nextOnClickAction: PropTypes.func.isRequired,
    nextButtonText: PropTypes.string,
    prevOnClickAction: PropTypes.func,
    page: PropTypes.number
  };

  NavigationButtons.defaultProps = {
    displayNext: false,
    displayPrev: false,
    nextButtonAnimation: '',
    nextButtonDisabled: false,
    nextOnClickAction: null,
    nextButtonText: '',
    prevOnClickAction: null,
    page: 1
  };

  const PreviousButton = () => {
    const [ t ] = useTranslation();

    return (
      <Animation onClick onHover type="rubber">
        <button
          type="button"
          className="Btn Btn-Sm Btn-S"
          onClick={prevOnClickAction}>
          {t('button.prev')}
        </button>
      </Animation>
    );
  };

  const NextButton = () => {
    return (
      <Animation onClick={!nextButtonDisabled} onHover={!nextButtonDisabled}
        type={nextButtonAnimation === 'error-shake' ? 'none' : 'rubber'}>
        {/* eslint-disable-next-line max-len */}
        <button type="button" className={`Btn Btn-Sm-X-W ${(page === 5 || page === 2 || page === 4 ? 'Btn-Su ' : 'Btn-S ')} ${nextButtonAnimation === 'error-shake' ? 'Error-Shake' : ''}`}
          disabled={nextButtonDisabled}
          onClick={nextOnClickAction}>
          {nextButtonText}
        </button>
      </Animation>
    );
  };

  return (
    <div className={`F-W Nav-Btns Flex A-I-C ${(page !== 4 ? 'J-C-C' : 'J-C-S-B')}`}>
      {displayPrev && <PreviousButton/>}
      {displayNext && <NextButton/>}
    </div>
  );
};

export { NavigationButtons };
