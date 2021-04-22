import React from 'react';
import './Error.css';
import {useHistory} from 'react-router-dom';
import {Picture} from "../UI-components/picture/Picture";
import {useTranslation} from "react-i18next";
import {Animation} from "../animation/Animation";

export const PageNotFound = () => {
  const history = useHistory();
  const [t] = useTranslation();

  function handleReturn() {
    history.push('/');
  }

  return (
    <div className='ErrorPage Grid'>
      <header className='TopBlock T-C Flex J-C-C A-I-C F-F-C-N'>
        <h1>
          {t('error.header')}
        </h1>
      </header>
      <div className='MiddleBlock Nunito Flex J-C-S-A A-I-C F-F-C-N'>
        <Picture src='http://localhost:3000/img/error.svg' alt='' imgClassName='categoryImageContainer'/>
        <Animation type='rubber' onHover={true} onClick={true} infinite={false}>
          <button onClick={() => handleReturn()} type='button' className='button-success button-small-x-wide'>
            {t('error.button')}
          </button>
        </Animation>
      </div>
    </div>
  );
};