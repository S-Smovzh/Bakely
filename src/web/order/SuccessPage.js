import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import success from '../../assets/images/svg/success.svg';
import { OrderFormContext } from '../context/orderForm/OrderFormContext';
import { Textarea } from '../UI-components/textarea/Textarea';
// import CartContext from '../context/cart/CartContext';
// import { buildShoppingCartDetails, buildSupportedPaymentMethodData } from './PaymentRequest';
import { NavigationButtons } from './OrderForm';

// eslint-disable-next-line react/prop-types
export const SuccessPage = ({ next, page }) => {
    const maxLength = 400;
    const [remainingCharacters, setRemainingCharacters] = useState(maxLength);
    const [message, setMessage] = useState('');
    // const [show, setShow] = useState(false);
    const [ t ] = useTranslation();
    const { orderForm, setOrderForm } = useContext(OrderFormContext);
    // const cartContext = useContext(CartContext);

    // useEffect(() => {
    //   const total = cartContext.cart.reduce((accumulator, currentValue) => accumulator.total + currentValue.total);
    //   // if (page === 5)
    //   const request = new PaymentRequest(buildSupportedPaymentMethodData(),
    //   buildShoppingCartDetails(cartContext.cart, total));
    //
    //   request.show().then((paymentResponse) => {
    //     paymentResponse.complete('success' || 'fail' || 'unknown').then(() => {
    //       setShow(true);
    //     });
    //   });
    // }, []);

    useEffect(() => {
      if (orderForm.bakery.length > 0) {
        setMessage(t('orderForm.success.message.delivery', {
          name: t('customer'),
          date: new Date(Date.now() + (48 * 60 * 60 * 1000)).toLocaleDateString('ru-RU'),
          bakery: orderForm.bakery
        }));
      } else {
        setMessage(t('orderForm.success.message.selfPickUp', {
          name: t('customer')
        }));
      }
    }, [ page ]);

    return (
      <section className={`Success-Page Grid F-H F-W ${page !== 5 ? 'None' : ''}`}>
        <header>
          <h1 className="T-C font-weight_600">
            {t('orderForm.success.header')}
          </h1>
        </header>
        <div className="Flex A-I-C J-C-F-S F-F-C-N T-C">
          <img src={success} alt=""
            className="SVG-Pop-Up"
          />
          <p className="h5-size font-weight_300">
            {message}
          </p>
        </div>
        <div className="S-C Flex A-I-F-S J-C-F-S F-F-C-N T-C">
          <Textarea labelText={t('label.comment')}
            id="comment" name="comment"
            onBlur={(event) => {
                      setOrderForm({ ...orderForm, comment: event.target.value });
                      setRemainingCharacters(maxLength - event.target.value.length);
                    }} textareaLimit={maxLength}
            onChange={(event) => {
                      setOrderForm({ ...orderForm, comment: event.target.value });
                      setRemainingCharacters(maxLength - event.target.value.length);
                    }} required="" autoComplete="off"
            tooltipId={t('tooltip.header')} tooltipText={t('tooltip.comment')} value={orderForm.comment}
          />
          <p className="F-W T-L">
            {t('remaining.characters')} {remainingCharacters}
          </p>
          <NavigationButtons page={page} nextButtonText={t('button.submit')}
            displayNext displayPrev={false}
            nextButtonDisabled={false}
            nextOnClickAction={() => next()}
          />
        </div>
      </section>
    );
  }
;
