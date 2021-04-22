import React, {useContext, useEffect, useState} from 'react';
import {Overlay} from '../../UI-components/overlay/Overlay';
import './CateringGallery.css';
import PropTypes from 'prop-types';
import useOnScreen from '../../utils/scrollHandler';
import {useLocation} from 'react-router-dom';
import {ModalContext} from '../../context/modal/ModalContext';
import {Card} from '../../UI-components/card/Card';
import {LoadingOverlay} from "../../UI-components/overlay/loading/LoadingOverlay";
import {useTranslation} from "react-i18next";
import {isTouchDevice} from "../../utils/isTouchDevice";

export default function CateringGallery({type, data}) {

  CateringGallery.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  };

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState(null);
  const {modal, setModal} = useContext(ModalContext);
  const location = useLocation();
  const [t] = useTranslation();

  const [elementRef] = useOnScreen({
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
    }
  }, [t]);

  function openModal(id) {
    location.eventId = id;
    setModal({
      ...modal,
      cateringModal: true
    });
    location.data = (events.filter((event) => {
      return event.id === Number.parseInt(id);
    })[0]);
  }

  return (
    <React.Fragment>
      <LoadingOverlay
        active={events.length === 0}
        text={t('overlay.getting')}>
        <div className='GalleryPage Grid'>
          <section className='TopBlock Flex A-I-C J-C-C'>
            <h1 className='T-C'>{title}</h1>
          </section>
          <section id='Overlays' className='MiddleBlock Flex A-I-C J-C-C'>
            <ul ref={isTouchDevice() ? null : elementRef} className='Event_List Flex A-I-F-S J-C-S-A F-F-R-W Nunito'>
              {events && events.map((event) => {
                return (
                  <li key={event.date} className='Event Flex A-I-C J-C-C'>
                    <Card className='listImageContainer'>
                      <Overlay src={event.imgSrc} alt='' type='button'
                               onClick={() => openModal(event.id)}
                               buttonClassName='button modal-show button-secondary button-small-x-wide'
                               text={t('catering.gallery.button.details')} >
                      </Overlay>
                      <div className='Event-Details fill-width Flex A-I-C J-C-S-B F-F-C-N T-C'>
                        <h3 className='h5-size'>{event.name}</h3>
                        <p className='h6-size t-'>{event.date}</p>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </LoadingOverlay>
    </React.Fragment>
  );
}
