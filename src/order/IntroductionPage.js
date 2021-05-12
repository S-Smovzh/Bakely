import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseButton from '../UI-components/button/close/CloseButton';
import useWindowDimensions from '../utils/isTouchDevice';
import { NavigationButtons } from './OrderForm';

// eslint-disable-next-line react/prop-types
export const IntroductionPage = ({ closeModal, page, next }) => {
  const [ t ] = useTranslation();
  const { height } = useWindowDimensions();

  return (
    <section className={`Introduction-Page F-W  Flex A-I-C J-C-S-B F-F-C-N 
    ${height > 380 ? 'F-H' : ''}
    ${(page !== 1 ? 'None' : '')}`}>
      <header className="F-W Flex A-I-C J-C-S-B F-F-R-N">
        <h1 className="h3-size F-W T-C">
          {t('orderForm.introduction.header')}
        </h1>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate/>
      </header>
      <p className="h5-size T-C">
        {t('orderForm.introduction.delivery')}
      </p>
      <NavigationButtons page={page} nextButtonText={t('button.next')}
        displayNext displayPrev={false}
        nextButtonDisabled={false}
        nextOnClickAction={next} nextButtonAnimation="rubber"
      />
    </section>
  );
};
