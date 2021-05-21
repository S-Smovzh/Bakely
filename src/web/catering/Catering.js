import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import useWindowDimensions, { isTouchDevice } from '../utils/isTouchDevice';
import { NextIcon, PrevIcon } from '../UI-components/icons/Icons';
import { Overlay } from '../UI-components/overlay/Overlay';
import { Animation } from '../UI-components/animation/Animation';
import { Card } from '../UI-components/card/Card';
import useOnScreen from '../utils/scrollHandler';
import Head from '../head/Head';
import './Catering.css';

import (/* webpackChunkName: "cateringController", webpackPrefetch: true */ './CateringController');
import (/* webpackChunkName: "cateringGallery", webpackPrefetch: true */ './gallery/CateringGallery');

export default function Catering() {
  const [ t ] = useTranslation();

  const [ elementRef ] = useOnScreen({
    root: null,
    rootMargin: '-15% 0px 0px 0px',
    threshold: 1.0
  }, '35%');

  const { width } = useWindowDimensions();

  const cardsData = [
    {
      src: 'https://res.cloudinary.com/gachi322/image/upload/v1620396601/Bakely/catering/wedding_pxwmoz.jpg',
      link: `/${i18n.language}/catering/gallery/wedding`,
      text: 'catering.gallery.wedding',
      headerText: 'catering.wedding.header',
      description: 'catering.wedding.description'
    },
    {
      src: 'https://res.cloudinary.com/gachi322/image/upload/v1620396601/Bakely/catering/celebration_fa7mj8.jpg',
      link: `/${i18n.language}/catering/gallery/celebration`,
      text: 'catering.gallery.celebration',
      headerText: 'catering.birthday.header',
      description: 'catering.birthday.description'
    },
    {
      src: 'https://res.cloudinary.com/gachi322/image/upload/v1620396601/Bakely/catering/catering_hxbnjx.jpg',
      link: `/${i18n.language}/catering/gallery/corporate`,
      text: 'catering.gallery.corporate',
      headerText: 'catering.corporate.header',
      description: 'catering.corporate.description'
    } ];

  return (
    <div className="Catering-Page Grid">
      <Head title={t('catering.seo.title')} description={t('catering.seo.description')} cardTitle={t('catering.seo.title')}
        cardDescription={t('catering.seo.cardDescription')} imgAlt={t('catering.seo.imgAlt')}
        imgUrl="https://res.cloudinary.com/gachi322/image/upload/v1620396524/Bakely/cards/catering_ze6rr0.jpg"
        imgUrlSecure="https://res.cloudinary.com/gachi322/image/upload/v1620396524/Bakely/cards/catering_ze6rr0.jpg" imgType="JPG"
      />
      <section className="B-T Flex J-C-C A-I-C">
        <h1 className="T-C">
          {t('catering.header')}
        </h1>
      </section>
      <section className="B-M Nunito Flex J-C-S-A A-I-C F-F-C-N">
        {width > 991 ? (
          <ul className="CateringOptions F-W Flex A-I-F-S J-C-S-A">
            {cardsData.map((item, index) => (
              <li key={index} className="F-H">
                <Card type="no-animation" backType="gray" className="Grid">
                  <Overlay pictureRef={isTouchDevice() ? null : elementRef}
                    src={item.src} alt="" imageType="none"
                    link={item.link} linkClassName="Btn Btn-S Btn-Sm-X-W"
                    text={t(item.text)} type="link"
                  />
                  <h2 className="Catering-Title Playfair T-C Flex J-C-C A-I-C">
                    {t(item.headerText)}
                  </h2>
                  <p className="Catering-Description F-H Flex J-C-C A-I-F-S T-J">
                    {t(item.description)}
                  </p>
                </Card>
              </li>
            )
            )}
          </ul>
        )
          : (
            <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch
              interval={null} className="F-W">
              {cardsData.map((item, index) => (
                <Carousel.Item key={index}>
                  <Card type="no-animation" backType="gray" className="Grid">
                    <Overlay pictureRef={isTouchDevice() ? null : elementRef}
                      alt="" imageType="none" link={item.link}
                      linkClassName="Btn Btn-S Btn-Sm-X-W" src={item.src}
                      text={t(item.text)} type="link"
                    />
                    <h2 className="Catering-Title Playfair T-C Flex J-C-C A-I-C">
                      {t(item.headerText)}
                    </h2>
                    <p className="Catering-Description F-H Flex J-C-C A-I-F-S T-J">
                      {t(item.description)}
                    </p>
                  </Card>
                </Carousel.Item>
              )
              )}
            </Carousel>
          )}
        <Animation onHover onClick type="bounce">
          <Link to={`/${i18n.language}/contact-us`} className={`Btn-P Btn-Sm-X-W ${width < 600 ? 'h6-size' : 'h5-size'}`}>
            {t('catering.contactUs')}
          </Link>
        </Animation>
      </section>
    </div>
  );
}
