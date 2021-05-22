import React from 'react';
import { useTranslation } from 'react-i18next';
import { attributionList } from './attributionList';
import './Attribution.css';

export default function Attribution() {
  const [ t ] = useTranslation();

  return (
    <div className="Attr-Page Grid Nunito">
      <header className="B-T T-C Flex J-C-C A-I-C F-F-C-N F-W">
        <h1 className="h3-size">
          {t('attribution.header')}
        </h1>
        <h2 className="h5-size">
          {t('attribution.main')}
          <a className="h6-size" href="mailto:sergiom33033@gmail.com">
            {' sergiom33033@gmail.com'}
          </a>
        </h2>
      </header>
      <div className="B-M Flex J-C-C A-I-C F-F-C-N F-W">
        <section className="Flex J-C-C A-I-C F-F-C-N F-W">
          <header className="T-C F-W">
            <h3>
              {t('icons')}
            </h3>
          </header>
          <ul className="Flex A-I-C J-C-C F-F-C-N F-W">
            {attributionList[0].map((item, index) => (
              <li key={index} className="F-W T-L">
                <a href={item.link} title={item.title}>
                  {item.author}
                </a>
              </li>
              )
            )}
          </ul>
        </section>
        <section className="Flex J-C-C A-I-C F-F-C-N F-W">
          <header className="T-C F-W">
            <h3>
              {t('photos')}
            </h3>
          </header>
          <ul className="Flex A-I-C J-C-C F-F-C-N F-W">
            {attributionList[1].map((item, index) => (
              <li key={index} className="F-W T-L">
                <a href={item}>
                  {item}
                </a>
              </li>
              )
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
