import React from 'react';
import './Main.css';
import {useTranslation} from 'react-i18next';
import {Overlay} from '../UI-components/overlay/Overlay';
import Slide from '../slides/Slides';
import {Carousel} from 'react-bootstrap';
import {HoverTooltip} from '../UI-components/tooltip/HoverTooltip';
import {Animation} from "../animation/Animation";
import {Link} from "react-router-dom";

export default function Main() {
  const [t] = useTranslation();

  return (
    <div className='Main-Page'>
      <section className='TopBlock'>
        <Carousel prevIcon={PrevIcon()} nextIcon={NextIcon()} touch={true} interval={10000} className='fill-width'>
          <Carousel.Item>
            <Slide imgAlt={t('main.slide.first.alt')} imgSrc='http://localhost:3000/img/slides/cakes-slide.jpg'
                   title={t('main.slide.first.title')} titleClass='secondary-100 DropShadowDarker LetterSpacing-2'
                   linkText={t('main.slide.first.link')} link='/shop/cakes'
                   linkClass='button-secondary button-large-x-wide font-weight_700'
                   description={t('main.slide.first.description')}
                   descriptionClass='layout-100 DropShadowDarker'/>
          </Carousel.Item>
          <Carousel.Item>
            <Slide imgAlt={t('main.slide.second.alt')} imgSrc='http://localhost:3000/img/slides/catering.jpg'
                   title={t('main.slide.second.title')} titleClass='secondary-100 DropShadowDarker LetterSpacing-2'
                   linkText={t('main.slide.second.link')} link='/catering'
                   linkClass='button-secondary button-large-x-wide font-weight_700'
                   description={t('main.slide.second.description')}
                   descriptionClass='layout-100 DropShadowDarker'/>
          </Carousel.Item>
          <Carousel.Item>
            <Slide imgAlt={t('main.slide.third.alt')} imgSrc='http://localhost:3000/img/slides/gift-box.jpg'
                   title={t('main.slide.third.title')} titleClass='secondary-100 DropShadowDarker LetterSpacing-2'
                   linkText={t('main.slide.third.link')} link='/shop'
                   linkClass='button-secondary button-large-x-wide font-weight_700'
                   description={t('main.slide.third.description')}
                   descriptionClass='layout-100 DropShadowDarker'/>
          </Carousel.Item>
        </Carousel>
      </section>
      <section className='MiddleBlock Nunito'>
        <div>
          <p className='h5-size'>
            {t('main.ourStory.text')}
          </p>
          <div>
            <Animation onClick={true} onHover={true} type='rubber'>
              <Link to='about' className='button-secondary button-small-x-wide h4-size'>
                {t('main.ourStory.button')}
              </Link>
            </Animation>
          </div>
        </div>
      </section>
      <section id='Overlays' className='BottomBlock'>
        <HoverTooltip/>
        <div className='GridWrapper'>
          <Overlay id='catering' src='http://localhost:3000/img/main/catering.jpg' alt='Cupcakes, example of catering.'
                   imageType='none' type='link' linkClassName='button-secondary button-small-x-wide'
                   link='/catering' text={t('main.catering.button')} animationOnClick={true} animationOnHover={true}
                   animationType='bounce'>
            <p className='Nunito'>{t('main.catering.text')}</p>
          </Overlay>
          <Overlay id='join_team' src='http://localhost:3000/img/main/team.jpg' alt='Our workers.'
                   imageType='none' type='link' linkClassName='button-secondary button-small-x-wide'
                   link='/careers' text={t('main.joinTeam.button')} animationOnClick={true} animationOnHover={true}
                   animationType='bounce'>
            <p className='Nunito'>{t('main.joinTeam.text')}</p>
          </Overlay>
          <Overlay id='shop_all' src='http://localhost:3000/img/main/order-online.jpg'
                   alt='Our sweets and bakery which you can order online.'
                   imageType='none' type='link' linkClassName='button-secondary button-small-x-wide'
                   link='/shop' text={t('main.shopAll.button')} animationOnClick={true} animationOnHover={true}
                   animationType='bounce'>
            <p className='Nunito'>{t('main.shopAll.text')}</p>
          </Overlay>
          <Overlay id='locations' src='http://localhost:3000/img/main/cafe.jpg' alt='Our bakery on Tumanyana street'
                   imageType='none' type='link' linkClassName='button-secondary button-small-x-wide'
                   link='/locations' text={t('main.locations.button')} animationOnClick={true} animationOnHover={true}
                   animationType='bounce'>
            <p className='Nunito'>{t('main.locations.text')}</p>
          </Overlay>
        </div>
      </section>
    </div>
  );
}

const PrevIcon = () => {
  return (
    <span className='button-primary button-icon'>
      <img src='http://localhost:3000/img/icons/arrow-left.svg' alt='arrow left' className='icon'/>
    </span>
  );
};

const NextIcon = () => {
  return (
    <span className='button-primary button-icon'>
      <img src='http://localhost:3000/img/icons/arrow-right.svg' alt='next left' className='icon'/>
    </span>
  );
};