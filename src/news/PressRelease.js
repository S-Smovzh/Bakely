import React, {useEffect, useState} from 'react';
import './PressRelease.css';
import axios from 'axios';
import {Picture} from '../UI-components/picture/Picture';
import {useTranslation} from "react-i18next";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {publicLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import i18n from "i18next";

export default function PressRelease(props) {
  const [article, setArticle] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [t] = useTranslation();
  const id = props.match.params.id;

  const getArticle = async () => {
    await axios
      .get(publicLinks.pressRelease(i18n.language, id))
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
      <article className='ArticlePage Grid'>
        <header className='TopBlock Flex J-C-C A-I-C F-F-C-N T-C'>
          <h1>{article.title}</h1>
          <p className='h6-size helper'>{new Date(Number.parseInt(article.date)).toLocaleDateString()}</p>
        </header>
        <section className='MiddleBlock Flex J-C-F-S A-I-C F-F-C-N Nunito'>
          {article.img !== '' ?
            <Picture src={article.img} alt={article.imgDescription} className='Image fill-width'/>
            : null}
          {paragraphs.map((paragraph, index) => {
            return <p key={index} className='fill-width h5-size T-C'>{paragraph}</p>;
          })
          }
        </section>
      </article>
    </LoadingOverlay>
  );
}
