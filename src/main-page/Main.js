import React from 'react';
import './Main.css';
import {useTranslation} from 'react-i18next';
import {Overlay} from '../UI-components/overlay/Overlay';
import Slide from '../slides/Slides';
import {Carousel} from 'react-bootstrap';
import {HoverTooltip} from '../UI-components/tooltip/HoverTooltip';
import {Animation} from "../animation/Animation";
import {Link} from "react-router-dom";
import {NextIcon, PrevIcon} from "../UI-components/icons/Icons";
import useWindowDimensions from "../utils/isTouchDevice";

export default function Main() {
  const [t] = useTranslation();
  const {width} = useWindowDimensions();

  const slides = [
    {
      imgAlt: 'main.slide.first.alt',
      imgSrc: 'http://localhost:3000/img/slides/cakes-slide.jpg',
      title: 'main.slide.first.title',
      linkText: 'main.slide.first.link',
      link: '/shop/cakes',
      description: 'main.slide.first.description'
    },
    {
      imgAlt: 'main.slide.second.alt',
      imgSrc: 'http://localhost:3000/img/slides/catering.jpg',
      title: 'main.slide.second.title',
      linkText: 'main.slide.second.link',
      link: '/catering',
      description: 'main.slide.second.description'
    },
    {
      imgAlt: 'main.slide.third.alt',
      imgSrc: 'http://localhost:3000/img/slides/gift-box.jpg',
      title: 'main.slide.third.title',
      linkText: 'main.slide.third.link',
      link: '/shop/gift-boxes',
      description: 'main.slide.third.description'
    }
  ];
  const overlays = [
    {
      id: 'join_team',
      src: 'http://localhost:3000/img/main/team.jpg',
      alt: 'Our workers.',
      link: '/careers',
      buttonText: 'main.joinTeam.button',
      paragraphText: 'main.joinTeam.text'
    },
    {
      id: 'catering',
      src: 'http://localhost:3000/img/main/catering.jpg',
      alt: 'Cupcakes, example of catering.',
      link: '/catering',
      buttonText: 'main.catering.button',
      paragraphText: 'main.catering.text'
    },
    {
      id: 'shop_all',
      src: 'http://localhost:3000/img/main/order-online.jpg',
      alt: 'Our sweets and bakery which you can order online.',
      link: '/shop',
      buttonText: 'main.shopAll.button',
      paragraphText: 'main.shopAll.text'
    },
    {
      id: 'locations',
      src: 'http://localhost:3000/img/main/cafe.jpg',
      alt: 'Our bakery on Tumanyana street',
      link: '/locations',
      buttonText: 'main.locations.button',
      paragraphText: 'main.locations.text'
    },
  ]

  return (
    <div className='Main-Page Grid'>
      <section className='TopBlock Flex J-C-C A-I-C'>
        <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch={true} interval={7000} className='fill-width'>
          {slides.map((item, index) =>
            <Carousel.Item key={index}>
              <Slide imgAlt={t(item.imgAlt)} imgSrc={item.imgSrc}
                     title={t(item.title)} titleClass='secondary-100 DropShadowDarker LetterSpacing-2'
                     linkText={t(item.linkText)} link={item.link}
                     linkClass='button-secondary button-large-x-wide font-weight_700'
                     description={t(item.description)}
                     descriptionClass='layout-100 DropShadowDarker'/>
            </Carousel.Item>
          )}
        </Carousel>
      </section>
      <section className='MiddleBlock Nunito Flex J-C-C A-I-C F-F-C-N T-C'>
        <div className={`Flex J-C-C A-I-C F-F-C-N T-J A-S-F-S ${width < 769 ? 'DropShadowLighter' : ''}`}>
          <p className={width > 768 ? 'h5-size' : 'h6-size'}>
            {t('main.ourStory.text')}
          </p>
          <div className='Flex J-C-C A-I-C F-F-C-N T-J'>
            <Animation onClick={true} onHover={true} type='rubber'>
              <Link to='about' className='button-secondary button-small-x-wide h6-size'>
                {t('main.ourStory.button')}
              </Link>
            </Animation>
          </div>
        </div>
      </section>
      <section id='Overlays' className='BottomBlock Flex A-I-C J-C-C'>
        <HoverTooltip/>
        <div className='GridWrapper Grid'>
          {overlays.map((item, index) =>
            <Overlay key={index} id={item.id} src={item.src}
                     alt={t(item.alt)}
                     imageType='none' type='link'
                     linkClassName={`button-secondary ${(width < 481 ? (t(item.buttonText).length > 12 ? 'button-small-x-wide' : 'button-small') : 'button-small-x-wide')}`}
                     link={item.link} text={t(item.buttonText)} animationOnClick={true} animationOnHover={true}
                     animationType='bounce'
                     imgClassName={index % 2 ? 'Main-Page_Vertical-Image' : 'Main-Page_Horizontal-Image'}>
              <p className='Nunito'>{t(item.paragraphText)}</p>
            </Overlay>
          )}
        </div>
      </section>
    </div>
  );
}
