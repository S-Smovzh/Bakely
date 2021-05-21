import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import { structuredDataList } from '../utils/structuredData';
import { CloudinaryImage } from '../UI-components/image/CloudinaryImage';
import { publicLinks } from '../utils/restLinks';
import { logError } from '../error/errorHandler';
import Head from '../head/Head';
import './PressRelease.css';

import (/* webpackChunkName: "news", webpackPrefetch: true */ './News');

export default function PressRelease(props) {
  const [article, setArticle] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [ t ] = useTranslation();
  // eslint-disable-next-line react/prop-types
  const id = props.match.params.id;

  const getArticle = async () => {
    article.length === 0 && paragraphs.length === 0 &&  await axios
      .get(publicLinks.pressRelease(i18n.language, id))
      .then(async (response) => {
        const { success, data } = response.data;

        if (success) {
          setArticle(data[0]);
          setParagraphs(data[0].mainText.split('/'));
        }
      }).catch((error) => logError(error));
  };

  useEffect(() => {
    getArticle();
  }, [id, t]);

  return (
    <LoadingOverlay
      active={article.length === 0}
      text={t('overlay.loading')}>
      <article className="Article-Page Grid">
        <Head title={article.title} description={paragraphs.join(' ').substr(0, 300)}
          cardTitle={article.title} cardDescription={paragraphs.join(' ').substr(0, 300)}
          imgUrl={article.img}
          imgUrlSecure={article.img}
          imgAlt={article.imgDescription} imgType="PNG"
          structuredDataJSON={structuredDataList.article(article.title)}
        />
        <header className="B-T Flex J-C-C A-I-C F-F-C-N T-C">
          <h1>{article.title}</h1>
          <p className="h6-size helper">{new Date(Number.parseInt(article.date, 10)).toLocaleDateString()}</p>
        </header>
        <section className="B-M Flex J-C-F-S A-I-C F-F-C-N Nunito">
          {article.img !== '' ? (
            <CloudinaryImage imageName={article.img} folders="press" imageHeight={null}
              imageWidth={null} alt={article.imgDescription} fillImage
            />
          )
            : null}
          {paragraphs.map((paragraph, index) => {
            return <p key={index} className="F-W h5-size T-J">{paragraph}</p>;
          })
          }
        </section>
      </article>
    </LoadingOverlay>
  );
}
