import React from 'react';
import './Catering.css';
import {Link} from 'react-router-dom';
import {Overlay} from '../UI-components/overlay/Overlay';
import {useTranslation} from 'react-i18next';
import useOnScreen from '../utils/scrollHandler';
import {Card} from "../UI-components/card/Card";
import {Animation} from "../animation/Animation";
import useWindowDimensions, {isTouchDevice} from "../utils/isTouchDevice";
import {NextIcon, PrevIcon} from "../UI-components/icons/Icons";
import {Carousel} from "react-bootstrap";

export default function Catering() {
  const [t] = useTranslation();
  const {width} = useWindowDimensions();

  const [elementRef] = useOnScreen({
    root: null,
    rootMargin: '-15% 0px 0px 0px',
    threshold: 1.0
  }, '35%');

  const cardsData = [
    {
      src: 'http://localhost:3000/img/catering/wedding.jpg',
      link: '/catering/gallery/wedding',
      text: 'catering.gallery.wedding',
      headerText: 'catering.wedding.header',
      description: 'catering.wedding.description'
    },
    {
      src: 'http://localhost:3000/img/catering/celebration.jpg',
      link: '/catering/gallery/celebration',
      text: 'catering.gallery.celebration',
      headerText: 'catering.birthday.header',
      description: 'catering.birthday.description'
    },
    {
      src: 'http://localhost:3000/img/catering/catering.jpg',
      link: '/catering/gallery/corporate',
      text: 'catering.gallery.corporate',
      headerText: 'catering.corporate.header',
      description: 'catering.corporate.description'
    }]
  return (
    <div className='CateringPage Grid'>
      <section className='TopBlock Flex J-C-C A-I-C'>
        <h1 className='T-C'>{t('catering.header')}</h1>
      </section>
      <section className='MiddleBlock Nunito Flex J-C-S-A A-I-C F-F-C-N'>
        {width > 991 ?
          <ul className='CateringOptions fill-width Flex A-I-F-S J-C-S-A'>
            {cardsData.map((item, index) =>
              <li key={index} className='fill-height'>
                <Card type='no-animation' backType='gray' className='Grid'>
                  <Overlay pictureRef={isTouchDevice() ? null : elementRef}
                           src={item.src}
                           alt='' imageType='none' link={item.link}
                           linkClassName='button button-secondary button-small-x-wide'
                           text={t(item.text)} type='link'>
                  </Overlay>
                  <h2 className='Catering-Title Playfair T-C Flex J-C-C A-I-C'>
                    {t(item.headerText)}
                  </h2>
                  <p className='Catering-Description fill-height Flex J-C-C A-I-F-S T-J'>
                    {t(item.description)}
                  </p>
                </Card>
              </li>
            )}
          </ul>
          :
          <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch={true} interval={null} className='fill-width'>
            {cardsData.map((item, index) =>
              <Carousel.Item key={index}>
                <Card type='no-animation' backType='gray' className='Grid'>
                  <Overlay pictureRef={isTouchDevice() ? null : elementRef}
                           src={item.src}
                           alt='' imageType='none' link={item.link}
                           linkClassName='button button-secondary button-small-x-wide'
                           text={t(item.text)} type='link'>
                  </Overlay>
                  <h2 className='Catering-Title Playfair T-C Flex J-C-C A-I-C'>
                    {t(item.headerText)}
                  </h2>
                  <p className='Catering-Description fill-height Flex J-C-C A-I-F-S T-J'>
                    {t(item.description)}
                  </p>
                </Card>
              </Carousel.Item>
            )}
          </Carousel>
        }
        <Animation onHover={true} onClick={true} type='bounce'>
          <Link to='/contact-us'
                className='button-primary button-small-x-wide h5-size'>{t('catering.contactUs')}</Link>
        </Animation>
      </section>
    </div>
  );
}
