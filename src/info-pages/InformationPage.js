import React from 'react';
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import './InfoPage.css';

export default function InformationPage() {
  const [t] = useTranslation();
  const location = useLocation();

  return (
    <div className='InfoPage'>
      <section className='TopBlock'>
        <h1>
          {t(`infoPages.${location.pathname.substr(1)}.header`)}
        </h1>
      </section>
      <section className='MiddleBlock'>
        <ul className='fill-width fill-height'>
          {Array.from(t(`infoPages.${location.pathname.substr(1)}`, {returnObjects: true})).map((item, index) => {
            return (
              <li key={index} className='fill-width fill-height'>
                <h2 className='h3-size'>
                  {item.question}
                </h2>
                <p>
                  {item.answer}
                </p>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  );
}
