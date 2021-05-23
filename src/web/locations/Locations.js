import React, { useCallback, useEffect, useState, useRef, useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { timer } from 'rxjs';
import i18n from 'i18next';
import axios from 'axios';
import { LoadingOverlay } from '../UI-components/overlay/loading/LoadingOverlay';
import mapMarker from '../../assets/images/icons/map-marker.svg';
import { Animation } from '../UI-components/animation/Animation';
import { ModalContext } from '../context/modal/ModalContext';
import { Overlay } from '../UI-components/overlay/Overlay';
import { useTouchDevice } from '../utils/useTouchDevice';
import { Card } from '../UI-components/card/Card';
import { publicLinks } from '../utils/restLinks';
import useOnScreen from '../utils/scrollHandler';
import { logError } from '../error/errorHandler';
import Head from '../head/Head';
import './Locations.css';

export default function Locations() {
  const [ t ] = useTranslation();
  const [locations, setLocations] = useState([]);
  const [map, setMap] = useState(null);
  const [ elementRef ] = useOnScreen({
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0.1
  }, '40%');
  const { modal, setModal } = useContext(ModalContext);
  const { isTouchDevice } = useTouchDevice();
  const centreRef = useRef();
  const center = [50.4501811, 30.5299976];

  useEffect(() => {
    getLocations();
  }, [ t ]);

  const getLocations = async () => {
    locations.length === 0 && axios.get(publicLinks.bakeries(i18n.language))
      .then(async (response) => {
        const { success, data } = response.data;

        if (success) {
          setLocations(await _isOpened(data));
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: 500
          });
        }
      }).catch((error) => logError(error));
  };

  function closeModal() {
    setModal({
      ...modal,
      locationModal: !modal.locationModal
    });
  }

  async function _isOpened(locs) {
    const hours = new Date().getHours();

    let workingHours = [];

    let i;

    for (i = 0; i < locs.length; i++) {
      locs[i].hours = locs[i].workingHours;
      workingHours = locs[i].workingHours.split('-');
      workingHours[0] = workingHours[0].split(':')[0];
      workingHours[1] = workingHours[1].split(':')[0];
      if ((workingHours[0] > hours || workingHours[1] < hours)) {
        locs[i].workingHours = t('closed');
      } else {
        locs[i].workingHours = t('open');
      }
    }
    return locs;
  }

  // eslint-disable-next-line react/prop-types
  function DisplayPosition({ locMap, locLatitude, locLongitude, locName }) {
    const onClick = useCallback(() => {
      setModal({
        ...modal,
        locationModal: true
      });
      try {
        // eslint-disable-next-line react/prop-types
        locMap.setView([locLatitude, locLongitude], 16);
        timer(10).subscribe(() => {
          // eslint-disable-next-line react/prop-types
          locMap.invalidateSize();
        });
      } catch (e) {
        return true;
      }
    }, [ locMap ]);

    return (
      <header onClick={onClick} className="Flex J-C-F-S">
        <button aria-label={t('locations.modal.button')}
          className="Btn-S Btn-Sm Modal-Tog Grid" type="button">
          <img src={mapMarker} className="Icon" alt=""/>
          <span className="helper">{locName}</span>
        </button>
      </header>
    );
  }

  return (
    <LoadingOverlay
      active={locations.length === 0}
      text={t('overlay.loading')}>
      <Head title={t('locations.seo.title')} description={t('locations.seo.description')}
        cardTitle={t('locations.seo.title')} cardDescription={t('locations.seo.cardDescription')}
        imgUrl="https://res.cloudinary.com/gachi322/image/upload/v1620396518/Bakely/cards/locations_mmj8zh.jpg"
        imgUrlSecure="https://res.cloudinary.com/gachi322/image/upload/v1620396518/Bakely/cards/locations_mmj8zh.jpg"
        imgAlt={t('locations.seo.imgAlt')} imgType="JPG"
      />
      <div className="Locations-Page Grid">
        <header className="B-T Flex J-C-C A-I-C T-C">
          <h1>
            {t('locations.header')}
          </h1>
        </header>
        <section ref={isTouchDevice ? null : elementRef} className="B-M Nunito">
          <ul className="Loc-L Flex J-C-S-A A-I-C F-F-R-W">
            {locations &&
            locations.map((location) => {
              return (
                <li key={location.longitude} className="Location Flex F-F-C-W Image-L-Con">
                  <DisplayPosition map={map} locLongitude={location.longitude}
                    locLatitude={location.latitude} locName={location.name}
                  />
                  <Card type="no-animation" className="Image-L-Con">
                    <Overlay src={location.img} alt={location.name} >
                      <p className="h4-size">{t('workingHours')}:</p>
                      <p className="h4-size">{location.hours}</p>
                    </Overlay>
                    <div className="D-W Flex J-C-C A-I-C F-F-C-N font-weight_600 F-W">
                      <p className="helper F-H T-C">{location.name}</p>
                      <a href={'tel:' + '+38' + location.telNum}
                        className="h6-size P-Link F-H T-C">{location.telNum}</a>
                      <p className="h6-size F-H T-C">{location.workingHours}</p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <Modal className="Modal Flex J-C-C A-I-C F-W F-H Map" onHide={() => closeModal()}
        show={modal.locationModal} centered size="xl">
        <Modal.Body className="Flex J-C-C A-I-C F-F-C-N F-W">
          <MapContainer
            id="map"
            ref={centreRef}
            center={center}
            className="Leaflet"
            zoom={11}
            maxZoom={18}
            attributionControl
            zoomControl
            doubleClickZoom
            scrollWheelZoom
            dragging
            animate
            whenReady={setMap}
            easeLinearity={0.35}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations &&
            locations.map((location) => {
              return (
                <Marker key={location.latitude} position={[location.latitude, location.longitude]}>
                  <Popup>
                    {location.name}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <Animation className="Flex J-C-C A-I-C" type="bounce" onHover
            onClick infinite={false}>
            <button onClick={() => closeModal()}
              type="button" className="Btn-E Btn-Sm-X-W" aria-label={t('button.close')}>
              {t('button.close')}
            </button>
          </Animation>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}
