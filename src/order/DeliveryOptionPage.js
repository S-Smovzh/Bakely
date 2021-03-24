import React, {useContext} from "react";
import {OrderFormContext} from "../context/orderForm/OrderFormContext";
import {Picture} from "../UI-components/picture/Picture";
import './OrderFrom.css';
import {useTranslation} from "react-i18next";
import CloseButton from "../UI-components/button/close/CloseButton";

export const OptionPage = ({closeModal, next, page}) => {
  const {orderForm, setOrderForm} = useContext(OrderFormContext);
  const [t] = useTranslation();

  return (
    <section className={'Options-Page fill-height fill-width ' + (page !== 3 ? 'none' : '')}>
      <form className='Form fill-width'>
        <fieldset className='Radio-Row-Double'>
          <legend className='Radio-Legend h3-size'>
            <span>Choose the delivery option</span>
            <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate={true}/>
          </legend>
          <div className='Radio-Row'>
            <button className='h4-size button button-secondary' aria-label={t('ariaLabel.orderForm.delivery')}
                    type='button'
                    onClick={() => {
                      setOrderForm({
                        ...orderForm,
                        delivery: true,
                        selfPickUp: false
                      });
                      next();
                    }}>
              {t('button.orderForm.delivery')}
              <Picture src='http://localhost:3000/img/svg/delivery.svg' alt='' imgClassName='Image-Option'
                       className='Delivery'/>
            </button>
          </div>
          <div className='Radio-Row'>
            <button className='h4-size button button-secondary' aria-label={t('ariaLabel.orderForm.selfPickUp')}
                    type='button'
                    onClick={() => {
                      setOrderForm({
                        ...orderForm,
                        delivery: false,
                        selfPickUp: true
                      });
                      next();
                    }}>
              {t('button.orderForm.selfPickUp')}
              <Picture src='http://localhost:3000/img/svg/self.svg' alt='' imgClassName='Image-Option'
                       className='Self'/>
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}