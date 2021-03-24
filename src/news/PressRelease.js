import React, {useEffect, useState} from 'react';
import './PressRelease.css';
import axios from 'axios';
import i18n from 'i18next';
import {Picture} from '../UI-components/picture/Picture';
import timeConverter from '../utils/dateConverter';
import {useTranslation} from "react-i18next";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {publicLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";

export default function PressRelease(props) {
  const [article, setArticle] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [t] = useTranslation();
  const language = i18n.language;
  const id = props.match.params.id;

  const getArticle = async () => {
    await axios
      .get(publicLinks.pressRelease(language, id))
      .then(async (response) => {
        const {success, data} = response.data;
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
      text={t('overlay.getting')}>
      <article className='ArticlePage'>
        <header className='TopBlock Title'>
          <h1>{article.title}</h1>
          <p className='h6-size helper'>{timeConverter(Number.parseInt(article.date), language, true)}</p>
        </header>
        <section className='MiddleBlock Description Nunito'>
          {article.img !== '' ?
            <Picture src={article.img} alt={article.imgDescription} className='Image'/>
            : null}
          {paragraphs.map((paragraph, index) => {
            return <p key={index} className='h6-size'>{paragraph}</p>;
          })
          }
        </section>
      </article>
    </LoadingOverlay>
  );
}
