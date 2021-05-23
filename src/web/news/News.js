import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import { CloudinaryImage } from '../UI-components/image/CloudinaryImage';
import useWindowDimensions from '../utils/useWindowDimensions';
import { imageClasses } from '../utils/imagesTypes';
import { Card } from '../UI-components/card/Card';
import { publicLinks } from '../utils/restLinks';
import { logError } from '../error/errorHandler';
import Head from '../head/Head';
import './News.css';

import (/* webpackChunkName: "pressRelease", webpackPrefetch: true */ './PressRelease');

export default function News() {
  const [ t ] = useTranslation();
  const [articles, setArticles] = useState([]);
  const [paragraphs, setParagraphs] = useState(new Map());
  const { width } = useWindowDimensions();
  const location = useLocation();

  useEffect(() => {
    getArticles();
  }, [ t ]);

  async function getArticles() {
    articles.length === 0 && axios.get(publicLinks.articles(i18n.languages[0]))
      .then(async (response) => {
        const { success, data } = response.data;

        if (success) {
          setArticles(data);
          let mainText = new Map();

          for (let i = 0; i < data.length; i++) {
            if (data[i].mainText.length > 240) {
              mainText.set(data[i].id, data[i].mainText.substr(0, 240).concat('...').split('/'));
            } else {
              mainText.set(data[i].id, data[i].mainText.split('/'));
            }
          }
          setParagraphs(mainText);
        }
      }).catch((error) => logError(error));
  }

  return (
    <LoadingOverlay
      active={articles.length === 0}
      text={t('overlay.loading')}>
      <Head title={t('news.seo.title')} description={t('news.seo.description')}/>
      <div className="News Grid">
        <header className="B-T Flex J-C-C A-I-C T-C">
          <h1>
            {t('news.header')}
          </h1>
        </header>
        <section className="B-M Nunito Flex J-C-S-A A-I-C F-F-R-W">
          {articles ? articles.map((article) => {
            return (
              <Link key={article.id} to={location.pathname + '/article/' + article.id}
                aria-label={`${t('article')} ${article.title}`}>
                <Card backType="gray" className={`Grid ${!article.img && 'No-Img'} ${width < 680 && 'Small-Screen'}`}>
                  {article.img ? (
                    <div className="Image SVG-Pop-Up Flex J-C-C A-I-C">
                      <CloudinaryImage imageName={article.img} alt={article.imgDescription}
                        imageHeight={imageClasses.news(width).height} folders="press"
                        imageWidth={imageClasses.news(width).width}
                      />
                    </div>
                    )
                    : null}
                  <div className="Title">
                    <h2 className="h3-size">{article.title}</h2>
                  </div>
                  <div className="Description Flex J-C-F-S A-I-C F-F-C-N F-H">
                    {paragraphs.get(article.id) && paragraphs.get(article.id).map((paragraph, i = 0) =>
                      <p key={article.title + ++i} className="h6-size">{paragraph}</p>
                    )}
                  </div>
                </Card>
              </Link>
            );
          }) : null}
        </section>
      </div>
    </LoadingOverlay>
  );
}
