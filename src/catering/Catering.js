import React from 'react';
import './Catering.css';
import {Link} from 'react-router-dom';
import {Overlay} from '../UI-components/overlay/Overlay';
import {useTranslation} from 'react-i18next';
import useOnScreen from '../utils/scrollHandler';
import {Card} from "../UI-components/card/Card";
import {Animation} from "../animation/Animation";

export default function Catering() {
  const [t] = useTranslation();

  const [elementRef] = useOnScreen({
    root: null,
    rootMargin: '-15% 0px 0px 0px',
    threshold: 1.0
  }, '35%');

  return (
    <div className='CateringPage'>
      <section className='TopBlock'>
        <h1>{t('catering.header')}</h1>
      </section>
      <section className='MiddleBlock Nunito'>
        <ul className='CateringOptions fill-width'>
          <li className='fill-height'>
            <Card type='no-animation' backType='gray'>
              <Overlay pictureRef={elementRef}
                       src='http://localhost:3000/img/catering/wedding.jpg'
                       alt='' imageType='none' link='/catering/gallery/wedding'
                       linkClassName='button button-secondary button-small-x-wide'
                       text={t('catering.gallery.wedding')} type='link'>
              </Overlay>
              <h2 className='Catering-Title Playfair'>
                {t('catering.wedding.header')}
              </h2>
              <p className='Catering-Description fill-height'>
                {t('catering.wedding.description')}
              </p>
            </Card>
          </li>
          <li className='fill-height'>
            <Card type='no-animation' backType='gray'>
              <Overlay src='http://localhost:3000/img/catering/celebration.jpg'
                       alt='' imageType='none' link='/catering/gallery/celebration'
                       linkClassName='button button-secondary button-small-x-wide'
                       text={t('catering.gallery.celebration')} type='link'>
              </Overlay>
              <h2 className='Catering-Title Playfair'>
                {t('catering.birthday.header')}
              </h2>
              <p className='Catering-Description fill-height'>
                {t('catering.birthday.description')}
              </p>
            </Card>
          </li>
          <li className='fill-height'>
            <Card type='no-animation' backType='gray'>
              <Overlay src='http://localhost:3000/img/catering/catering.jpg'
                       alt='' imageType='none' link='/catering/gallery/corporate'
                       linkClassName='button button-secondary button-small-x-wide'
                       text={t('catering.gallery.corporate')} type='link'>
              </Overlay>
              <h2 className='Catering-Title Playfair'>
                {t('catering.corporate.header')}
              </h2>
              <p className='Catering-Description fill-height'>
                {t('catering.corporate.description')}
              </p>
            </Card>
          </li>
        </ul>
        <div className='contact-link'>
          <Animation onHover={true} onClick={true} type='bounce'>
            <Link to='/contact-us'
                  className='button-primary button-large-x-wide h3-size'>{t('catering.contactUs')}</Link>
          </Animation>
        </div>
      </section>
    </div>
  );
}
