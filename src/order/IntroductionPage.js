import React from "react";
import {NavigationButtons} from "./OrderForm";
import {useTranslation} from "react-i18next";
import CloseButton from "../UI-components/button/close/CloseButton";
import useWindowDimensions from "../utils/isTouchDevice";

export const IntroductionPage = ({closeModal, page, next}) => {
  const [t] = useTranslation();
  const {height} = useWindowDimensions();

  return (
    <section className={`Introduction-Page Flex A-I-C J-C-S-B F-F-C-N ${height > 380 && 'fill-height'} fill-width ${(page !== 1 ? 'none' : '')}`}>
      <header className='fill-width Flex A-I-C J-C-S-B F-F-R-N'>
        <h1 className='h3-size fill-width T-C'>
          {t('orderForm.introduction.header')}
        </h1>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate={true}/>
      </header>
      <p className='h5-size T-C'>
        {t('orderForm.introduction.delivery')}
      </p>
      <NavigationButtons page={page} nextButtonText={t('button.next')}
                         displayNext={true} displayPrev={false}
                         nextButtonDisabled={false}
                         nextOnClickAction={next} nextButtonAnimation='rubber'/>
    </section>
  );
}
