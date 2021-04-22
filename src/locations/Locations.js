import React, {useCallback, useEffect, useState, useRef, useContext} from 'react';
import './Locations.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarker} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Overlay} from '../UI-components/overlay/Overlay';
import {Card} from '../UI-components/card/Card';
import i18n from 'i18next';
import {Modal} from 'react-bootstrap';
import {ModalContext} from '../context/modal/ModalContext';
import useOnScreen from '../utils/scrollHandler';
import {useTranslation} from "react-i18next";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {publicLinks} from "../utils/restLinks";
import {timer} from "rxjs";
import {logError} from "../error/errorHandler";
import {Animation} from "../animation/Animation";
import {isTouchDevice} from "../utils/isTouchDevice";

export function Locations() {
  const [locations, setLocations] = useState([]);
  const [map, setMap] = useState(null);
  const [t] = useTranslation();
  const [elementRef] = useOnScreen({
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0.1
  }, '40%');
  const {modal, setModal} = useContext(ModalContext);
  const centreRef = useRef();
  const center = [50.4501811, 30.5299976];

  useEffect(() => {
    getLocations();
  }, [t]);

  const getLocations = async () => {
    axios.get(publicLinks.bakeries(i18n.language))
      .then(async (response) => {
        const {success, data} = response.data;
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

  async function _isOpened(locations) {
    const hours = new Date().getHours();
    let workingHours = [];
    let i;

    for (i = 0; i < locations.length; i++) {
      locations[i].hours = locations[i].workingHours;
      workingHours = locations[i].workingHours.split('-');
      workingHours[0] = workingHours[0].split(':')[0];
      workingHours[1] = workingHours[1].split(':')[0];
      if ((workingHours[0] > hours || workingHours[1] < hours)) {
        locations[i].workingHours = t('closed'); //TODO
      } else {
        locations[i].workingHours = t('open');
      }
    }
    return locations;
  }

  function DisplayPosition({map, latitude, longitude, name}) {
    const onClick = useCallback(() => {
      setModal({
        ...modal,
        locationModal: true
      });
      try {
        map.setView([latitude, longitude], 16);
        timer(10).subscribe(() => {
          map.invalidateSize();
        });
      } catch (e) {
        return true;
      }
    }, [map]);

    return (
      <header onClick={onClick} className='ButtonWrapper Flex J-C-F-S'>
        <button aria-label={t('locations.modal.button')}
                className='button-secondary button-small Modal-Toggle Grid' type='button'>
          <FontAwesomeIcon icon={faMapMarker}/>
          <span className='helper'>{name}</span>
        </button>
      </header>
    );
  }

  return (
    <LoadingOverlay
      active={locations.length === 0}
      text={t('overlay.getting')}>
      <div className='LocationsPage Grid'>
        <header className='TopBlock Flex J-C-C A-I-C T-C'>
          <h1>
            {t('locations.header')}
          </h1>
        </header>
        <section ref={isTouchDevice() ? null : elementRef} className='MiddleBlock Nunito'>
          <ul className='LocationsList Flex J-C-S-A A-I-C F-F-R-W'>
            {locations &&
            locations.map((location) => {
              return (
                <li key={location.longitude} className='Location Flex F-F-C-W'>
                  <DisplayPosition map={map} longitude={location.longitude}
                                   latitude={location.latitude} name={location.name}/>
                  <Card type='no-animation' className='listImageContainer'>
                    <Overlay src={location.img} alt={location.name}>
                      <p className='h4-size'>Working Hours:</p>
                      <p className='h4-size'>{location.hours}</p>
                    </Overlay>
                    <div className='DetailsWrapper Flex J-C-C A-I-C F-F-C-N font-weight_500 fill-width'>
                      <p className='h6-size fill-width fill-height T-L'>{location.name}</p>
                      <a href={'tel:' + '+38' + location.telNum}
                         className='h6-size Primary-Link fill-width fill-height T-L'>{location.telNum}</a>
                      <p className='h6-size fill-width fill-height T-L'>{location.workingHours}</p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <Modal className='Modal Flex J-C-C A-I-C fill-width fill-height Map' onHide={() => closeModal()}
             show={modal.locationModal} centered={true} size="xl">
        <Modal.Body className='Flex J-C-C A-I-C F-F-C-N fill-width'>
          <MapContainer
            id='map'
            ref={centreRef}
            center={center}
            className='Leaflet'
            zoom={11}
            maxZoom={18}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            whenReady={setMap}
            easeLinearity={0.35}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
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
          <Animation className='Flex J-C-C A-I-C' type='bounce' onHover={true} onClick={true} infinite={false}>
            <button onClick={() => closeModal()}
                    type='button' className='button-error button-small-x-wide' aria-label={t('button.close')}>
              {t('button.close')}
            </button>
          </Animation>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}
