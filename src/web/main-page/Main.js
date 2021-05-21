import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import about from '../../assets/images/svg/about.svg';
import { HoverTooltip } from '../UI-components/tooltip/HoverTooltip';
import { NextIcon, PrevIcon } from '../UI-components/icons/Icons';
import { structuredDataList } from '../utils/structuredData';
import { Overlay } from '../UI-components/overlay/Overlay';
import useWindowDimensions from '../utils/isTouchDevice';
import { Animation } from '../UI-components/animation/Animation';
import Slide from '../UI-components/slide/Slide';
import Head from '../head/Head';
import './Main.css';

export default function Main() {
  const [ t ] = useTranslation();
  const { width } = useWindowDimensions();

  const slides = [
    {
      imgAlt: 'main.slide.first.alt',
      imgSrc: 'https://res.cloudinary.com/gachi322/image/upload/v1620396496/Bakely/slides/cakes-slide_gusklq.jpg',
      title: 'main.slide.first.title',
      linkText: 'main.slide.first.link',
      link: `/${i18n.language}/shop/cakes`,
      description: 'main.slide.first.description'
    },
    {
      imgAlt: 'main.slide.second.alt',
      imgSrc: 'https://res.cloudinary.com/gachi322/image/upload/v1620396496/Bakely/slides/catering_vcdkvm.jpg',
      title: 'main.slide.second.title',
      linkText: 'main.slide.second.link',
      link: `/${i18n.language}/catering`,
      description: 'main.slide.second.description'
    },
    {
      imgAlt: 'main.slide.third.alt',
      imgSrc: 'https://res.cloudinary.com/gachi322/image/upload/v1620396498/Bakely/slides/gift-box_f7tkw4.jpg',
      title: 'main.slide.third.title',
      linkText: 'main.slide.third.link',
      link: `/${i18n.language}/shop/gift-boxes`,
      description: 'main.slide.third.description'
    }
  ];

  const overlays = [
    {
      id: 'join_team',
      imageName: 'team_xwd5aj.jpg',
      alt: 'main.joinTeam.alt',
      link: `/${i18n.language}/careers`,
      buttonText: 'main.joinTeam.button',
      paragraphText: 'main.joinTeam.text'
    },
    {
      id: 'catering',
      imageName: 'catering_xuj5gp.jpg',
      alt: 'main.catering.alt',
      link: `/${i18n.language}/catering`,
      buttonText: 'main.catering.button',
      paragraphText: 'main.catering.text'
    },
    {
      id: 'shop_all',
      imageName: 'order-online_za1r3r.jpg',
      alt: 'main.shopAll.alt',
      link: `/${i18n.language}/shop`,
      buttonText: 'main.shopAll.button',
      paragraphText: 'main.shopAll.text'
    },
    {
      id: 'locations',
      imageName: 'cafe_ju6t7g.jpg',
      alt: 'main.locations.alt',
      link: `/${i18n.language}/locations`,
      buttonText: 'main.locations.button',
      paragraphText: 'main.locations.text'
    }
  ];

  return (
    <div className="Main-Page Grid">
      <Head title={t('main.seo.title')} description={t('main.seo.description')}
        cardTitle={t('main.seo.title')} cardDescription={t('main.seo.cardDescription')}
        imgUrl="https://res.cloudinary.com/gachi322/image/upload/v1620396520/Bakely/cards/main_xcs24m.jpg"
        imgUrlSecure="https://res.cloudinary.com/gachi322/image/upload/v1620396520/Bakely/cards/main_xcs24m.jpg"
        imgAlt={t('main.seo.imgAlt')} imgType="JPG"
        structuredDataJSON={structuredDataList.localBusiness(t('city'), t('street'), t('country'), '02387')}
      />
      <section className="B-T Flex J-C-C A-I-F-S">
        <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch
          interval={7000} className="F-W" fade>
          {slides.map((item, index) => (
            <Carousel.Item key={index}>
              <Slide imgAlt={t(item.imgAlt)} imgSrc={item.imgSrc}
                title={t(item.title)} titleClass="secondary-100 DropShadowDarker LetterSpacing-2"
                linkText={t(item.linkText)} link={item.link}
                linkClass="Btn-S Btn-L-X-W font-weight_600"
                description={t(item.description)}
                descriptionClass="layout-100 DropShadowDarker"
              />
            </Carousel.Item>
          )
          )}
        </Carousel>
      </section>
      <section className="B-M Nunito Flex J-C-C A-I-C F-F-C-N T-C" style={
        { background: `url(${about})` }
      }>
        <div className="Flex J-C-C A-I-C F-F-C-N T-J A-S-F-E DropShadowLighter">
          <p className={width > 768 ? 'h5-size' : 'h6-size'}>
            {t('main.ourStory.text')}
          </p>
          <div className="Flex J-C-C A-I-C F-F-C-N T-J">
            <Animation onClick onHover type="rubber">
              <Link to={`/${i18n.language}/about`} className="Btn-S Btn-Sm-X-W h6-size">
                {t('main.ourStory.button')}
              </Link>
            </Animation>
          </div>
        </div>
      </section>
      <section id="Overlays" className="B-B Flex A-I-C J-C-C">
        <HoverTooltip/>
        <div className="GridWrapper Grid">
          {overlays.map((item, index) => (
              // eslint-disable-next-line max-len
            <Overlay linkClassName={`Btn-S ${(width < 481 ? (t(item.buttonText).length > 12 ? 'Btn-Sm-X-W' : 'Btn-Sm') : 'Btn-Sm-X-W')}`}
              key={index} id={item.id} imageName={item.imageName}
              alt={t(item.alt)} imageType={index % 2 ? 'main.vertical' : 'main.horizontal'} type="link"
              link={item.link} text={t(item.buttonText)}
              animationOnClick animationOnHover cldI
              animationType="bounce" folders="main">
              <p className="Nunito">{t(item.paragraphText)}</p>
            </Overlay>
          )
          )}
        </div>
      </section>
    </div>
  );
}
