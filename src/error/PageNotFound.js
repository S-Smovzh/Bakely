import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import notFound from '../images/svg/internal-error.svg';
import { Animation } from '../animation/Animation';
import Head from '../head/Head';
import './Error.css';

export default function PageNotFound() {
  const history = useHistory();
  const [ t ] = useTranslation();

  function handleReturn() {
    history.push('/en/');
  }

  return (
    <div className="Error-Page Grid">
      <Head title={t('error.seo.title')} description={t('error.seo.description')}/>
      <header className="B-T T-C Flex J-C-C A-I-C F-F-C-N">
        <h1>
          {t('error.header')}
        </h1>
      </header>
      <div className="B-M Nunito Flex J-C-S-A A-I-C F-F-C-N">
        <img src={notFound} alt="" className="categoryImageContainer"/>
        <Animation type="rubber" onHover onClick
          infinite={false}>
          <button onClick={() => handleReturn()} type="button" className="Btn-Su Btn-Sm-X-W">
            {t('error.button')}
          </button>
        </Animation>
      </div>
    </div>
  );
}
