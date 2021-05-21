import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { LoadingOverlay } from '../../UI-components/overlay/loading/LoadingOverlay';
import { ModalContext } from '../../context/modal/ModalContext';
import { Overlay } from '../../UI-components/overlay/Overlay';
import { isTouchDevice } from '../../utils/isTouchDevice';
import useOnScreen from '../../utils/scrollHandler';
import { Card } from '../../UI-components/card/Card';
import Head from '../../head/Head';
import './CateringGallery.css';

import (/* webpackChunkName: "catering", webpackPrefetch: true */ '../Catering');

export default function CateringGallery({ type, data }) {
  CateringGallery.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  };

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState(null);
  const { modal, setModal } = useContext(ModalContext);
  const location = useLocation();
  const [ t ] = useTranslation();

  const [ elementRef ] = useOnScreen({
    root: null,
    rootMargin: '-22% 0px -45% 0px',
    threshold: 0.1
  }, '35%');

  useEffect(() => {
    setEvents(data);
    switch (type) {
      case 'all':
        setTitle(t('catering.gallery.all'));
        break;
      case 'wedding':
        setTitle(t('catering.gallery.wedding'));
        break;
      case 'celebration':
        setTitle(t('catering.gallery.celebration'));
        break;
      case 'corporate':
        setTitle(t('catering.gallery.corporate'));
        break;
      default:
        setTitle(t('catering.gallery.all'));
        break;
    }
  }, [ t ]);

  function openModal(id) {
    location.eventId = id;
    setModal({
      ...modal,
      cateringModal: true
    });
    location.data = events.filter((event) => event.id === Number.parseInt(id, 10))[0];
  }

  return (
    <LoadingOverlay
      active={!events || events.length === 0}
      text={t('overlay.loading')}>
      <Head title={t('catering.gallery.seo.title')} description={t('catering.seo.description')}
        cardTitle={t('catering.gallery.seo.title')}
        cardDescription={t('catering.seo.cardDescription')} imgAlt={t('catering.seo.imgAlt')}
        imgUrl="https://res.cloudinary.com/gachi322/image/upload/v1620396524/Bakely/cards/catering_ze6rr0.jpg"
        imgUrlSecure="https://res.cloudinary.com/gachi322/image/upload/v1620396524/Bakely/cards/catering_ze6rr0.jpg" imgType="JPG"
      />
      <div className="Gallery-Page Grid">
        <section className="B-T Flex A-I-C J-C-C">
          <h1 className="T-C">{title}</h1>
        </section>
        <section id="Overlays" className="B-M Flex A-I-C J-C-C">
          <ul ref={isTouchDevice() ? null : elementRef} className="Ev-L Flex A-I-F-S J-C-S-A F-F-R-W Nunito">
            {events && events.map((event) => {
              return (
                <li key={event.date} className="Event Flex A-I-C J-C-C">
                  <Card className="Image-L-Con">
                    <Overlay src={event.imgSrc} alt="" type="button"
                      onClick={() => openModal(event.id)}
                      buttonClassName="Btn modal-show Btn-S Btn-Sm-X-W"
                      text={t('catering.gallery.button.details')}
                    />
                    <div className="Ev-Det F-W Flex A-I-C J-C-S-B F-F-C-N T-C">
                      <h3 className="h5-size">{event.name}</h3>
                      <p className="h6-size t-">{event.date}</p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </LoadingOverlay>
  );
}
