import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderFormContext } from '../context/orderForm/OrderFormContext';
import CloseButton from '../UI-components/button/close/CloseButton';
import useWindowDimensions from '../utils/isTouchDevice';
import delivery from '../images/svg/delivery.svg';
import self from '../images/svg/self.svg';

// eslint-disable-next-line react/prop-types
export const OptionPage = ({ closeModal, next, page }) => {
  const [ t ] = useTranslation();
  const { orderForm, setOrderForm } = useContext(OrderFormContext);
  const { height, width } = useWindowDimensions();

  return (
    <fieldset
      className={`Options-Page Radio-Row-Double F-W Flex J-C-S-B A-I-C F-F-C-N
      ${(height < 500 ? '' : 'F-H')}
      ${(page !== 3 ? 'None' : '')}`}>
      <legend className="Radio-Legend Flex A-I-F-S J-C-S-B T-C h3-size">
        <span>Choose the delivery option</span>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate/>
      </legend>
      <div className={`Flex J-C-S-B A-I-C ${width < 769 ? 'F-F-C-N' : 'F-F-R-N'} F-W F-H`}>
        <div className="Radio-R Flex J-C-C A-I-C F-F-C-N">
          <button className="h4-size Btn Btn-S Flex J-C-C A-I-C F-F-C-N"
            aria-label={t('ariaLabel.orderForm.delivery')}
            type="button"
            onClick={() => {
              setOrderForm({
                ...orderForm,
                delivery: true,
                selfPickUp: false
              });
              next();
            }}>
            {t('button.orderForm.delivery')}
            <img src={delivery} alt="" className="Image-Option"/>
          </button>
        </div>
        <div className="Radio-R Flex J-C-C A-I-C F-F-C-N">
          <button className="h4-size Btn Btn-S Flex J-C-C A-I-C F-F-C-N"
            aria-label={t('ariaLabel.orderForm.selfPickUp')}
            type="button"
            onClick={() => {
              setOrderForm({
                ...orderForm,
                delivery: false,
                selfPickUp: true
              });
              next();
            }}>
            {t('button.orderForm.selfPickUp')}
            <img src={self} alt="" className="Image-Option"/>
          </button>
        </div>
      </div>
    </fieldset>
  );
};
