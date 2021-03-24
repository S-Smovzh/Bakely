import React, {useEffect, useState} from 'react';
import './News.css';
import axios from 'axios';
import i18n from 'i18next';
import {Link, useLocation} from 'react-router-dom';
import {Picture} from '../UI-components/picture/Picture';
import {useTranslation} from "react-i18next";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {Card} from "../UI-components/card/Card";
import {publicLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [paragraphs, setParagraphs] = useState(new Map());
  const [t] = useTranslation();
  let language = i18n.language;
  const location = useLocation();

  useEffect(() => {
    getArticles().then();
  }, [i18n.language]);

  async function getArticles() {
    axios.get(publicLinks.articles(language))
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
      <div className='PressRelease'>
        <header className='TopBlock'>
            <h1>
              {t('news.header')}
            </h1>
        </header>
        <section className='MiddleBlock Nunito'>
          {articles ? articles.map((article) => {
            return (
              <Link key={article.id} to={location.pathname + '/article/' + article.id} aria-label={`Article "${article.title}"`}>
                <Card backType='gray'>
                  {article.img !== '' ? <div className='Image SVG-Image-Pop-Up'>
                    <Picture src={article.img} alt={article.imgDescription} imgClassName='SVG-Image-Pop-Up'/>
                  </div> : null}
                  <div className='Title'>
                    <h2 className='h3-size'>{article.title}</h2>
                  </div>
                  <div className='Description fill-height'>
                    {paragraphs.get(article.id) && paragraphs.get(article.id).map((paragraph, i = 0) => {
                      return <p key={article.title + ++i} className='h6-size'>{paragraph}</p>;
                    })
                    }
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
