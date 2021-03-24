import React from 'react';
import './About.css';
import {Picture} from '../UI-components/picture/Picture';
import {useTranslation} from 'react-i18next';

export const About = () => {
  const [t] = useTranslation();

  return (
    <div className='AboutPage'>
      <section className='TopBlock'>
        <header className='TitleWrapper'>
          <h1>
            {t('about.header')}
          </h1>
        </header>
        <ul className='ImageList'>
          <li>
            <Picture src='http://localhost:3000/img/about/about_1.jpg' alt=''
                     imgClassName='Image_200_300'/>
          </li>
          <li>
            <Picture src='http://localhost:3000/img/about/about_2.jpg' alt=''
                     imgClassName='Image_200_300'/>
          </li>
          <li>
            <Picture src='http://localhost:3000/img/about/about_3.jpg' alt=''
                     imgClassName='Image_200_300'/>
          </li>
        </ul>
      </section>
      <section className='MiddleBlock Nunito'>
        <article className='Appeal'>
          <p>
            {t('about.appeal.firstPart')}
          </p>
          <p>
            {t('about.appeal.secondPart')}
          </p>
          <p>
            {t('about.appeal.thirdPart')}
          </p>
          <p>
            {t('about.appeal.fourthPart')}
          </p>
          <p>
            {t('about.appeal.fifthPart')}
          </p>
          <p>
            {t('about.appeal.sixthPart')}
          </p>
        </article>
      </section>
      <section className='BottomBlock Nunito'>
        <header className='TitleWrapper'>
          <h1 className='Playfair'>
            {t('about.feedbacks.header')}
          </h1>
        </header>
        <blockquote className="Quote">
          {t('about.feedbacks.first')}
          <cite>{t('about.feedbacks.first.author')}</cite>
        </blockquote>
        <blockquote className="Quote">
          {t('about.feedbacks.second')}
          <cite>{t('about.feedbacks.second.author')}</cite>
        </blockquote>
        <blockquote className="Quote">
          {t('about.feedbacks.third')}
          <cite>{t('about.feedbacks.third.author')}</cite>
        </blockquote>
      </section>
    </div>
  );
};
