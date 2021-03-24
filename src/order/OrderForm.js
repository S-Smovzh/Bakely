import React, {useContext, useEffect, useState} from 'react';
import './../UI-components/modal/Modal.css';
import {OrderFormContext} from '../context/orderForm/OrderFormContext';
import {ContactDataPage} from './ContactData';
import {DeliveryPage} from './DeliveryPage';
import {useTranslation} from 'react-i18next';
import {ModalContext} from "../context/modal/ModalContext";
import {Modal} from "react-bootstrap";
import {OptionPage} from "./DeliveryOptionPage";
import {SelfPickUpPage} from "./SelfPickUpPage";
import {IntroductionPage} from "./IntroductionPage";
import {SuccessPage} from "./SuccessPage";
import AuthContext from "../context/auth/AuthContext";
import {Animation} from "../animation/Animation";

const OrderForm = () => {
  const authContext = useContext(AuthContext);
  const {modal, setModal} = useContext(ModalContext);
  const {orderForm, setOrderForm} = useContext(OrderFormContext);
  const [currentPage, setCurrentPage] = useState(1);

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
  }

  useEffect(() => {
    if (modal.usersOrder) {
      if (currentPage === 1 || 2) {
        setCurrentPage(3);
      }
    }
  }, [modal]);

  function _next() {
    setCurrentPage(currentPage < 5 ? currentPage + 1 : null);
  }

  function _prev() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <Modal
      className={'Modal Order-Form ' + (currentPage === 1 ? 'Small' : 'Medium')}
      onHide={() => closeModal()}
      show={(authContext.logged && modal.usersOrder) || modal.clientsOrder}
      backdrop="static"
      keyboard={true}
      centered>
      <Modal.Body className='fill-width'>
        {modal.clientsOrder ?
          <React.Fragment>
            <IntroductionPage page={currentPage} next={_next} closeModal={closeModal}/>
            <ContactDataPage page={currentPage} next={_next} closeModal={closeModal}/>
          </React.Fragment>
          : null}
        <OptionPage page={currentPage} type={!authContext.logged ? 'client' : null} next={_next}
                    closeModal={closeModal}/>
        <SelfPickUpPage page={currentPage} next={_next} prev={_prev} closeModal={closeModal}/>
        <DeliveryPage page={currentPage} type={!authContext.logged ? 'client' : null} next={_next} prev={_prev}
                      closeModal={closeModal}/>
        <SuccessPage page={currentPage} next={closeModal} closeModal={closeModal}/>
      </Modal.Body>
    </Modal>
  );
};

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

  const PreviousButton = () => {
    const [t] = useTranslation();

    return (
      <Animation onClick={true} onHover={true} type='rubber'>
        <button
          type='button'
          className='button button-small button-secondary'
          onClick={prevOnClickAction}>
          {t('button.prev')}
        </button>
      </Animation>
    );
  }

  const NextButton = () => {
    return (
      <Animation onClick={!nextButtonDisabled} onHover={!nextButtonDisabled} type={nextButtonAnimation === 'error-shake' ? 'none' : 'rubber'}>
        <button
          type='button'
          className={'button button-small ' + (page === 5 || 2 || 4 ? 'button-success ' : 'button-secondary ') + (nextButtonAnimation === 'error-shake' ? 'Error-Shake' : '')}
          disabled={nextButtonDisabled}
          onClick={nextOnClickAction}>
          {nextButtonText}
        </button>
      </Animation>
    );
  }

  return (
    <div className={'fill-width NavigationButtons ' + (page !== 4 ? 'One' : 'Two')}>
      {displayPrev && <PreviousButton/>}
      {displayNext && <NextButton/>}
    </div>
  );
}

export {OrderForm, NavigationButtons};