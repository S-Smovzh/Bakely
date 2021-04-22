import React from 'react';
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import './InfoPage.css';

export default function InformationPage() {
  const [t] = useTranslation();
  const location = useLocation();

  return (
    <div className='InfoPage Grid'>
      <section className='TopBlock Flex J-C-C A-I-C T-C'>
        <h1>
          {t(`infoPages.${location.pathname.substr(1)}.header`)}
        </h1>
      </section>
      <section className='MiddleBlock Nunito Flex J-C-S-B A-I-F-S F-F-C-N'>
        <ul className='Flex J-C-S-B A-I-F-S F-F-C-N fill-width fill-height'>
          {Array.from(t(`infoPages.${location.pathname.substr(1)}`, {returnObjects: true})).map((item, index) => {
            return (
              <li key={index} className='Flex J-C-S-B A-I-F-S F-F-C-N fill-width fill-height'>
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
