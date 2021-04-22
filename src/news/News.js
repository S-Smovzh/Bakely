import React, {useEffect, useState} from 'react';
import './News.css';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import {Picture} from '../UI-components/picture/Picture';
import {useTranslation} from "react-i18next";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {Card} from "../UI-components/card/Card";
import {publicLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import i18n from "i18next";
import useWindowDimensions from "../utils/isTouchDevice";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [paragraphs, setParagraphs] = useState(new Map());
  const [t] = useTranslation();
  const location = useLocation();
  const {width} = useWindowDimensions();

  useEffect(() => {
    getArticles();
  }, [t]);

  async function getArticles() {
    axios.get(publicLinks.articles(i18n.language))
      .then(async (response) => {
        const {success, data} = response.data;
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
      text={t('overlay.getting')}>
      <div className='News Grid'>
        <header className='TopBlock Flex J-C-C A-I-C T-C'>
          <h1>
            {t('news.header')}
          </h1>
        </header>
        <section className='MiddleBlock Nunito Flex J-C-S-A A-I-C F-F-R-W'>
          {articles ? articles.map((article) => {
            return (
              <Link key={article.id} to={location.pathname + '/article/' + article.id}
                    aria-label={`${t('article')} ${article.title}`}>
                <Card backType='gray' className={`Grid ${!article.img && 'No-Img'} ${width < 680 && 'Small-Screen'}`}>
                  {article.img ?
                    <div className='Image Flex J-C-C A-I-C'>
                      <Picture src={article.img} alt={article.imgDescription} imgClassName='SVG-Image-Pop-Up'/>
                    </div>
                    : null}
                  <div className='Title'>
                    <h2 className='h3-size'>{article.title}</h2>
                  </div>
                  <div className='Description Flex J-C-F-S A-I-C F-F-C-N fill-height'>
                    {paragraphs.get(article.id) && paragraphs.get(article.id).map((paragraph, i = 0) =>
                      <p key={article.title + ++i} className='h5-size'>{paragraph}</p>
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
