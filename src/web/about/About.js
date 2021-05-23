import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import { CloudinaryImage } from '../UI-components/image/CloudinaryImage';
import { NextIcon, PrevIcon } from '../UI-components/icons/Icons';
import useWindowDimensions from '../utils/useWindowDimensions';
import Head from '../head/Head';
import './About.css';

export default function About() {
  const [ t ] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <div className="Page-About Grid">
      <Head title={t('about.seo.title')} description={t('about.seo.description')}/>
      <section className="B-T Grid">
        <header className="Flex J-C-C A-I-C T-C">
          <h1>
            {t('about.header')}
          </h1>
        </header>
        {width > 1199 ? (
          <ul className="I-L Flex J-C-S-B A-I-C F-F-R-N">
            <li>
              <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
                imageName="about_1_xgbygc.jpg" alt=""
              />
            </li>
            <li>
              <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
                imageName="about_2_wngn5h.jpg" alt=""
              />
            </li>
            <li>
              <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
                imageName="about_3_yuunir.jpg" alt=""
              />
            </li>
          </ul>
        )
          : (
            <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch
              interval={null} className="F-W" fade>
              <Carousel.Item>
                <div className="Flex A-I-C J-C-C">
                  <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
                    imageName="about_1_xgbygc.jpg" alt=""
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="Flex A-I-C J-C-C">
                  <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
                    imageName="about_2_wngn5h.jpg" alt=""
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="Flex A-I-C J-C-C">
                  <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
                    imageName="about_3_yuunir.jpg" alt=""
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          )}
      </section>
      <section className="B-M Nunito Flex J-C-C A-I-C">
        <article className="Appeal Flex J-C-C A-I-C F-F-C-N">
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
      <section className="B-B Nunito Flex J-C-C A-I-C F-F-C-N">
        <header className="T-C">
          <h1 className="Playfair">
            {t('about.feedbacks.header')}
          </h1>
        </header>
        <blockquote className="Quote Italic">
          {t('about.feedbacks.first')}
          <cite>{t('about.feedbacks.first.author')}</cite>
        </blockquote>
        <blockquote className="Quote Italic">
          {t('about.feedbacks.second')}
          <cite>{t('about.feedbacks.second.author')}</cite>
        </blockquote>
        <blockquote className="Quote Italic">
          {t('about.feedbacks.third')}
          <cite>{t('about.feedbacks.third.author')}</cite>
        </blockquote>
      </section>
    </div>
  );
}
