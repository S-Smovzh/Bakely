import React from "react";
import './OrderFrom.css';
import {NavigationButtons} from "./OrderForm";
import {useTranslation} from "react-i18next";
import CloseButton from "../UI-components/button/close/CloseButton";

export const IntroductionPage = ({closeModal, page, next}) => {
  const [t] = useTranslation();

  return (
    <section className={'Introduction-Page fill-height fill-width ' + (page !== 1 ? 'none' : '')}>
      <header className='fill-width'>
        <h1 className='h3-size'>
          {t('orderForm.introduction.header')}
        </h1>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate={true}/>
      </header>
      <p className='h5-size'>
        {t('orderForm.introduction.delivery')}
      </p>
      <NavigationButtons page={page} nextButtonText={t('button.next')}
                         displayNext={true} displayPrev={false}
                         nextButtonDisabled={false}
                         nextOnClickAction={next} nextButtonAnimation='rubber'/>
    </section>
  );
}