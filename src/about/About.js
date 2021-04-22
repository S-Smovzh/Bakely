import React from 'react';
import './About.css';
import {Picture} from '../UI-components/picture/Picture';
import {useTranslation} from 'react-i18next';
import about_1 from '../images/about/about_1.jpg';
import about_2 from '../images/about/about_2.jpg';
import about_3 from '../images/about/about_3.jpg';
import useWindowDimensions from "../utils/isTouchDevice";
import {Carousel} from "react-bootstrap";
import {NextIcon, PrevIcon} from "../UI-components/icons/Icons";
import Head from "../head/Head";

export const About = () => {
  const [t] = useTranslation();
  const {width} = useWindowDimensions();

  return (
    <div className='AboutPage Grid'>
      <section className='TopBlock Grid'>
        <header className='TitleWrapper Flex J-C-C A-I-C T-C'>
          <h1>
            {t('about.header')}
          </h1>
        </header>
        {width > 1199 ?
          <ul className='ImageList Flex J-C-S-B A-I-C F-F-R-N'>
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
          :
          <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch={true} interval={null} className='fill-width'>
            <Carousel.Item>
              <div className='Flex A-I-C J-C-C'>
                <img src={about_1} alt=''
                     className='Image_200_300'/>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='Flex A-I-C J-C-C'>
                <img src={about_2} alt=''
                     className='Image_200_300'/>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='Flex A-I-C J-C-C'>
                <img src={about_3} alt=''
                     className='Image_200_300'/>
              </div>
            </Carousel.Item>
          </Carousel>
        }
      </section>
      <section className='MiddleBlock Nunito  Flex J-C-C A-I-C'>
        <article className='Appeal Flex J-C-C A-I-C F-F-C-N'>
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
      <section className='BottomBlock Nunito Flex J-C-C A-I-C F-F-C-N'>
        <header className='T-C TitleWrapper'>
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
