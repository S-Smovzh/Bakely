import React, {useContext, useEffect, useState} from "react";
import {OrderFormContext} from "../context/orderForm/OrderFormContext";
import {Picture} from "../UI-components/picture/Picture";
import {Input} from "../UI-components/input/Input";
import {NavigationButtons} from "./OrderForm";
import {useTranslation} from "react-i18next";

export const SuccessPage = ({next, page}) => {
  const maxLength = 400;
  const {orderForm, setOrderForm} = useContext(OrderFormContext);
  const [remainingCharacters, setRemainingCharacters] = useState(400);
  const [message, setMessage] = useState('');
  const [t] = useTranslation();

  useEffect(() => {
    if (orderForm.bakery.length > 0) {
      setMessage(t('orderForm.success.message.delivery', {
        name: localStorage.getItem('name') ? localStorage.getItem('name') : 'customer',
        date: new Date(Date.now() + (48 * 60 * 60 * 1000)).toLocaleDateString("ru-RU"),
        bakery: orderForm.bakery
      }));
    } else {
      setMessage(t('orderForm.success.message.selfPickUp', {
        name: localStorage.getItem('name') ? localStorage.getItem('name') : 'customer'
      }));
    }
  }, [page])

  return (
    <section className={'Success-Page fill-height fill-width ' + (page !== 5 ? 'none' : '')}>
      <header>
        <h1 className='font-weight_500'>
          {t('orderForm.success.header')}
        </h1>
      </header>
      <div className='LeftCol'>
        <Picture src='http://localhost:3000/img/svg/success.svg' alt=''
                 imgClassName='SVG-Image-Pop-Up'/>
        <p className='h5-size font-weight_200'>
          {message}
        </p>
      </div>
      <form className='RightCol Form' method='POST'>
        <Input labelText={('contact.label.comment')}
               inputId='comment' inputType='textarea' inputName='comment'
               inputOnBlur={(event) => {
                 setOrderForm({...orderForm, comment: event.target.value});
                 setRemainingCharacters(maxLength - event.target.value.length);
               }} textareaLimit={maxLength}
               inputOnChange={(event) => {
                 setOrderForm({...orderForm, comment: event.target.value});
                 setRemainingCharacters(maxLength - event.target.value.length);
               }} inputRequired='' autoComplete='on'
               tooltipId={t('tooltip.header.comment')} tooltipText={t('tooltip.comment')} value={orderForm.comment}/>
        <p>
          {t('orderForm.success.comment.characters')} {remainingCharacters}
        </p>
        <NavigationButtons page={page} nextButtonText={t('button.submit')}
                           displayNext={true} displayPrev={false}
                           nextButtonDisabled={false}
                           nextOnClickAction={() => next()}/>
      </form>
    </section>
  );
}