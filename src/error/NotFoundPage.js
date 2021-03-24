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
    <div className='ErrorPage'>
      <header className='TopBlock'>
        <h1>
          {t('error.header')}
        </h1>
      </header>
      <div className='MiddleBlock Nunito'>
        <Picture src='http://localhost:3000/img/error.svg' alt='Error 404' imgClassName='categoryImageContainer'/>
        <Animation type='rubber' onHover={true} onClick={true} infinite={false}>
          <button onClick={() => handleReturn()} type='button' className='button-success button-small-x-wide'>
            {t('error.button')}
          </button>
        </Animation>
      </div>
    </div>
  );
};