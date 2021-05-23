import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel, Dropdown } from 'react-bootstrap';
import i18n from 'i18next';
import axios from 'axios';
import { OrderFormContext } from '../context/orderForm/OrderFormContext';
import { clientLinks, publicLinks, userLinks } from '../utils/restLinks';
import CloseButton from '../UI-components/button/close/CloseButton';
import { NextIcon, PrevIcon } from '../UI-components/icons/Icons';
import { ModalContext } from '../context/modal/ModalContext';
import useWindowDimensions from '../utils/useWindowDimensions';
import AuthContext from '../context/auth/AuthContext';
import { Input } from '../UI-components/input/Input';
import errorHandler from '../utils/errorHandler';
import { logError } from '../error/errorHandler';
import { NavigationButtons } from './OrderForm';
import { timer } from 'rxjs';

// eslint-disable-next-line react/prop-types
export const DeliveryPage = ({ closeModal, next, page, prev, type }) => {
  const authContext = useContext(AuthContext);

  const [ t ] = useTranslation();

  const [addAddress, setAddAddress] = useState(authContext.logged
    && !(authContext.addresses
      && authContext.addresses.length > 0));

  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNum, setHouseNum] = useState('');
  const [flatNum, setFlatNum] = useState('');

  const [cityError, setCityError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [houseNumError, setHouseNumError] = useState('');
  const [flatNumError, setFlatNumError] = useState('');

  const [availableCities, setAvailableCities] = useState([]);

  const { modal, setModal } = useContext(ModalContext);
  const { orderForm } = useContext(OrderFormContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    _getAvailableCities();
  }, [ t ]);

  async function _getAvailableCities() {
    availableCities.length === 0 && await axios.get(publicLinks.availableCities(i18n.language))
      .then((response) => {
        const { success, data, errors } = response.data;

        if (success && !errors) {
          setAvailableCities(data);
        }
      }).catch((e) => logError(e));
  }

  async function sendDeliveryData() {
    let url;

    let config;

    const address = {
      city: city,
      street: street,
      houseNum: Number.parseInt(houseNum, 10),
      flatNum: Number.parseInt(flatNum, 10)
    };

    if (type === 'client') {
      url = clientLinks.addDeliveryAddress;
      config = {
        headers: {
          'Client-Token': localStorage.getItem(btoa('clientsToken'))
            ? atob(localStorage.getItem(btoa('clientsToken'))) : null,
          withCredentials: true
        }
      };
    } else {
      url = userLinks.addDeliveryAddress;
      config = {
        headers: {
          Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
          'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
            ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
          withCredentials: true
        }
      };
    }

    timer(50).subscribe(async () =>
      await axios.post(url, address, config)
        .then((response) => {
          const { success, errors } = response.data;

          if (!success && errors) {
            if (errors.code === 500 || errors.code === 600) {
              setModal({
                ...modal,
                internalError: true,
                errorCode: errors.code
              });
            } else if (errors.code === 10) {
              setCityError(errorHandler(errors.code));
              setStreetError(errorHandler(errors.code));
              setHouseNumError(errorHandler(errors.code));
              setFlatNumError(errorHandler(errors.code));
            } else {
              if (errors.city) {
                setCityError(errorHandler(errors.city));
              } else {
                setCityError('');
              }
              if (errors.street) {
                setStreetError(errorHandler(errors.street));
              } else {
                setStreetError('');
              }
              if (errors.houseNum) {
                setHouseNumError(errorHandler(errors.houseNum));
              } else {
                setHouseNumError('');
              }
              if (errors.flatNum) {
                setFlatNumError(errorHandler(errors.flatNum));
              } else {
                setFlatNumError('');
              }
            }
          } else {
            authContext.addDeliveryAddress(address);
            setCity('');
            setStreet('');
            setHouseNum('');
            setFlatNum('');
            setCityError(null);
            setStreetError(null);
            setHouseNumError(null);
            setFlatNumError(null);
          }
        })
        .catch((error) => logError(error))
    );
  }

  const citySelect = (
    <div className="Form-R Grid">
      <label htmlFor="city-dropdown" className="Form-L F-W h6-size" tabIndex="-1">
        {t('label.city')}
      </label>
      <Dropdown onSelect={(eventKey) => setCity(eventKey)}
        className="F-W">
        <Dropdown.Toggle variant={null} id="city-dropdown" className="F-W Btn-S Form-Sel">
          {!city ? t('homepage.selectCity') : city}
        </Dropdown.Toggle>
        <Dropdown.Menu className="F-W C-M" flip={false}>
          {availableCities && availableCities.map((item) => {
            return (
              <Dropdown.Item key={item.city} eventKey={item.city} className="T-C">
                {item.city}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <p className={cityError ? 'Form-L-E Italic F-W Flex' : 'None'}>
        {cityError ? cityError : null}
      </p>
    </div>
  );

  const streetCell = (
    <div className="Form-R Grid">
      <Input errorIdentifier={streetError} labelText={t('label.street')}
        errorLabelText={streetError}
        inputId="street" inputType="text" inputName="street"
        inputOnBlur={(e) => setStreet(e.target.value)}
        inputOnChange={(e) => setStreet(e.target.value)} inputRequired="required" autoComplete="off"
        value={street} tooltipId={t('tooltip.header')} tooltipText={t('tooltip.street')}
      />
    </div>
  );

  const houseNumCell = (
    <div className="Form-R Grid">
      <Input errorIdentifier={houseNumError} labelText={t('label.houseNum')}
        errorLabelText={houseNumError}
        inputId="houseNum" inputType="number" inputName="houseNum"
        inputOnBlur={(e) => setHouseNum(e.target.value)}
        inputOnChange={(e) => setHouseNum(e.target.value)}
        inputRequired="required" autoComplete="off" value={houseNum}
        tooltipId={t('tooltip.header')} min={1}
        tooltipText={t('tooltip.header')}
      />
    </div>
  );

  const flatNumCell = (
    <div className="Form-R Grid">
      <Input errorIdentifier={flatNumError} labelText={t('label.flatNum')}
        errorLabelText={flatNumError}
        inputId="flatNum" inputType="number" inputName="flatNum"
        inputOnBlur={(e) => setFlatNum(e.target.value)} min={1}
        inputOnChange={(e) => setFlatNum(e.target.value)} inputRequired="required"
        autoComplete="off" tooltipId={t('tooltip.header')}
        tooltipText={t('tooltip.telNumOrHouseOrFlatNum')} value={flatNum}
      />
    </div>
  );

  return (
    // eslint-disable-next-line max-len
    <section className={`Delivery-Page Flex J-C-F-S A-I-C F-F-C-N F-H F-W ${((orderForm.selfPickUp || page !== 4) ? 'None' : '')}`}>
      <header className="Flex A-I-C F-F-R-N J-C-S-B T-L F-W">
        {authContext.logged ? (
          <div className="Tab-C Flex A-I-C J-C-F-S F-F-R-N">
            <button onClick={() => setAddAddress(false)}
              className={`Tab helper Flex J-C-C A-I-C Btn-Sm Btn-P ${(authContext.logged && !addAddress ? 'Active' : '')}`}
              type="button" disabled={!(authContext.addresses && authContext.addresses.length > 0)}>
              {t('button.orderForm.selectAddress')}
            </button>
            <button onClick={() => setAddAddress(true)}
              className={`Tab helper Flex J-C-C A-I-C Btn-Sm Btn-P 
              ${(authContext.logged && addAddress ? 'Active' : '')}`}
              type="button">
              {t('button.orderForm.addAddress')}
            </button>
          </div>
          )
          :
          <h1 className="h3-size">{t('orderForm.delivery.client.header')}</h1>
        }
        <CloseButton onClick={closeModal} animate ariaLabel={t('ariaLabel.close')}/>
      </header>
      {authContext.logged && authContext.addresses && authContext.addresses.length > 0 && !addAddress
        ? (
          <React.Fragment>
            {authContext.addresses.map((item, index) => {
              return (
                <div key={index} className="Radio-R F-W">
                  <button className="h4-size Btn Btn-Sm-A-W F-W Btn-S"
                    aria-label={t('ariaLabel.orderForm.selfPickUp')}
                    type="button"
                    onClick={() => {
                            setCity(item.city);
                            setStreet(item.street);
                            setHouseNum(item.houseNum);
                            setFlatNum(item.flatNum);
                            next();
                          }}>
                    {t('city')} {item.city}, {t('street')} {item.street} {item.houseNum}, {t('flat')} {item.flatNum}.
                  </button>
                </div>
              );
            })}
          </React.Fragment>
        )
        : (
          <React.Fragment>
            {width > 768 ? (
              <form className="Form Flex F-F-C-N F-W">
                <fieldset className="Form-R-D">
                  {citySelect}
                  {streetCell}
                </fieldset>
                <fieldset className="Form-R-D">
                  {houseNumCell}
                  {flatNumCell}
                </fieldset>
              </form>
              )
              : (
                <React.Fragment>
                  <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch
                    interval={1000000000} className="F-W">
                    <Carousel.Item>
                      <fieldset className="Flex J-C-S-A A-I-C F-F-C-N F-H">
                        {citySelect}
                        {streetCell}
                      </fieldset>
                    </Carousel.Item>
                    <Carousel.Item>
                      <fieldset className="Flex J-C-S-A A-I-C F-F-C-N F-H">
                        {houseNumCell}
                        {flatNumCell}
                      </fieldset>
                    </Carousel.Item>
                  </Carousel>
                </React.Fragment>
              )}
          </React.Fragment>
        )}
      <NavigationButtons page={page} nextButtonText={t('button.submit')} prevOnClickAction={() => prev()}
        displayNext={authContext.logged ? addAddress : true} displayPrev
        nextButtonDisabled={!city || !street || !houseNum || !flatNum}
        nextOnClickAction={() => {
                           sendDeliveryData();
                           next();
                         }}
      />
    </section>
  );
};
