import React, {useContext} from "react";
import {OrderFormContext} from "../context/orderForm/OrderFormContext";
import {Picture} from "../UI-components/picture/Picture";
import {useTranslation} from "react-i18next";
import CloseButton from "../UI-components/button/close/CloseButton";
import useWindowDimensions from "../utils/isTouchDevice";

export const OptionPage = ({closeModal, next, page}) => {
  const [t] = useTranslation();
  const {orderForm, setOrderForm} = useContext(OrderFormContext);
  const {height, width} = useWindowDimensions();

  return (
    <fieldset
      className={`Options-Page Radio-Row-Double ${(height < 500 ? '' : 'fill-height')} fill-width Flex J-C-S-B A-I-C F-F-C-N ${(page !== 3 ? 'none' : '')}`}>
      <legend className='Radio-Legend Flex A-I-F-S J-C-S-B T-C h3-size'>
        <span>Choose the delivery option</span>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate={true}/>
      </legend>
      <div className={`Flex J-C-S-B A-I-C ${width < 769 ? 'F-F-C-N' : 'F-F-R-N'} fill-width fill-height`}>
        <div className='Radio-Row Flex J-C-C A-I-C F-F-C-N'>
          <button className='h4-size button button-secondary Flex J-C-C A-I-C F-F-C-N'
                  aria-label={t('ariaLabel.orderForm.delivery')}
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
        <div className='Radio-Row Flex J-C-C A-I-C F-F-C-N'>
          <button className='h4-size button button-secondary Flex J-C-C A-I-C F-F-C-N'
                  aria-label={t('ariaLabel.orderForm.selfPickUp')}
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
      </div>
    </fieldset>
  );
}
