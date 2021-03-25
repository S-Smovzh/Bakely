import React from 'react';
import './About.css';
import {Picture} from '../UI-components/picture/Picture';
import {useTranslation} from 'react-i18next';
import about_1 from '../images/about/about_1.jpg';
import about_2 from '../images/about/about_2.jpg';
import about_3 from '../images/about/about_3.jpg';

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
            <Picture src={about_1} alt=''
                     imgClassName='Image_200_300'/>
          </li>
          <li>
            <Picture src={about_2} alt=''
                     imgClassName='Image_200_300'/>
          </li>
          <li>
            <Picture src={about_3} alt=''
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
