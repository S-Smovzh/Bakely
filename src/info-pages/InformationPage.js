import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { structuredDataList } from '../utils/structuredData';
import Head from '../head/Head';
import './InfoPage.css';

export default function InformationPage() {
  const [ t ] = useTranslation();
  const location = useLocation();
  const type = location.pathname.split('/')[2];

  return (
    <div className="Info-Page Grid">
      <Head title={t(`infoPages.${type}.seo.title`)}
        description={t(`infoPages.${type}.seo.description`)}
        structuredDataJSON={type === 'faq' ? structuredDataList.faq(
          t('infoPages.faq', { returnObjects: true })[0].question,
          t('infoPages.faq', { returnObjects: true })[0].answer,
          t('infoPages.faq', { returnObjects: true })[1].question,
          t('infoPages.faq', { returnObjects: true })[1].answer,
          t('infoPages.faq', { returnObjects: true })[2].question,
          t('infoPages.faq', { returnObjects: true })[2].answer,
          t('infoPages.delivery', { returnObjects: true })[3].question,
          t('infoPages.delivery', { returnObjects: true })[3].answer,
          t('infoPages.order', { returnObjects: true })[4].question,
          t('infoPages.order', { returnObjects: true })[4].answer
        ) : null}
      />
      <section className="B-T Flex J-C-C A-I-C T-C">
        <h1>
          {t(`infoPages.${type}.header`)}
        </h1>
      </section>
      <section className="B-M Nunito Flex J-C-S-B A-I-F-S F-F-C-N">
        <ul className="Flex J-C-S-B A-I-F-S F-F-C-N F-W F-H">
          {Array.from(t(`infoPages.${type}`, { returnObjects: true })).map((item, index) => {
            return (
              <li key={index} className="Flex J-C-S-B A-I-F-S F-F-C-N F-W F-H">
                <h2 className="h3-size">
                  {item.question}
                </h2>
                <p>
                  {item.answer}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
