import React, {useContext, useEffect, useState} from 'react';
import './../UI-components/form/Form.css';
import axios from 'axios';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import {ModalContext} from '../context/modal/ModalContext';
import errorHandler from '../utils/errorHandler';
import {OrderFormContext} from "../context/orderForm/OrderFormContext";
import AuthContext from "../context/auth/AuthContext";
import {NavigationButtons} from "./OrderForm";
import {Select} from "../UI-components/select/Select";
import {clientLinks, publicLinks, userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import {clientConfig, userConfig} from "../utils/restApiConfigs";
import CloseButton from "../UI-components/button/close/CloseButton";
import i18n from "i18next";

export const DeliveryPage = ({closeModal, next, page, prev, type}) => {
  const {modal, setModal} = useContext(ModalContext);
  const {orderForm} = useContext(OrderFormContext);
  const authContext = useContext(AuthContext);
  const [t] = useTranslation();

  const [addAddress, setAddAddress] = useState(authContext.logged && !(authContext.addresses && authContext.addresses.length > 0));

  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNum, setHouseNum] = useState('');
  const [flatNum, setFlatNum] = useState('');

  const [cityError, setCityError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [houseNumError, setHouseNumError] = useState('');
  const [flatNumError, setFlatNumError] = useState('');

  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    _getAvailableCities();
  }, [t]);

  async function _getAvailableCities() {
    await axios.get(publicLinks.availableCities(i18n.language))
      .then((response) => {
        const {success, data, errors} = response.data;
        if (success && !errors) {
          setAvailableCities(data);
        }
      }).catch((e) => logError(e));
  }

  async function sendDeliveryData() {
    let url, config;

    const address = {
      city: city,
      street: street,
      houseNum: Number.parseInt(houseNum),
      flatNum: Number.parseInt(flatNum)
    };

    if (type === 'client') {
      url = clientLinks.addDeliveryAddress;
      config = clientConfig;
    } else {
      url = userLinks.addDeliveryAddress;
      config = userConfig;
    }

    await axios.post(url, address, config)
      .then((response) => {
        const {success, errors} = response.data;
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
      .catch((error) => logError(error));
  }

  return (
    <section
      className={`Delivery-Page fill-height fill-width ${((orderForm.selfPickUp || page !== 4) ? 'none' : '')}`}>
      <header className='Flex A-I-C F-F-R-N J-C-S-B T-L fill-width'>
        {authContext.logged ?
          <div className='Tab-Container Flex A-I-C J-C-F-S F-F-R-N'>
            <button onClick={() => setAddAddress(false)}
                    className={`Tab helper Flex J-C-C A-I-C button-small button-primary ${(authContext.logged && !addAddress ? 'Active' : '')}`}
                    type='button' disabled={!(authContext.addresses && authContext.addresses.length > 0)}>
              {t('button.orderForm.selectAddress')}
            </button>
            <button onClick={() => setAddAddress(true)}
                    className={`Tab helper Flex J-C-C A-I-C button-small button-primary ${(authContext.logged && addAddress ? 'Active' : '')}`}
                    type='button'>
              {t('button.orderForm.addAddress')}
            </button>
          </div>
          :
          <h1 className='h3-size'>{t('orderForm.delivery.client.header')}</h1>
        }
        <CloseButton onClick={closeModal} animate={true} ariaLabel={t('ariaLabel.close')}/>
      </header>
      {authContext.logged && authContext.addresses && authContext.addresses.length > 0 && !addAddress
        ?
        <React.Fragment>
          {authContext.addresses.map((item, index) => {
            return (
              <div key={index} className='Radio-Row fill-width'>
                <button className='h4-size button button-small-auto-wide fill-width button-secondary'
                        aria-label='Self-pick-up option'
                        type='button'
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
        :
        <React.Fragment>
          <form className='Form fill-width'>
            <fieldset className='Form-Row-Double'>
              <div className='Form-Row'>
                <Select selectName='city' selectOnBlur={(event) => setCity(event.target.value)}
                        selectOnChange={(event) => setCity(event.target.value)} value={city}
                        errorIdentifier={cityError} errorLabelText={cityError} labelText={t('label.city')}
                        selectId='city'>
                  <option value={0}>
                    -- Select city
                  </option>
                  {availableCities && availableCities.map((item) => {
                    return (
                      <option key={item.city} value={item.city}>
                        {item.city}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={streetError} labelText={t('label.street')}
                       errorLabelText={streetError}
                       inputId='street' inputType='text' inputName='street'
                       inputOnBlur={(e) => setStreet(e.target.value)}
                       inputOnChange={(e) => setStreet(e.target.value)} inputRequired='required' autoComplete='off'
                       value={street} tooltipId={t('tooltip.header.street')} tooltipText={t('tooltip.street')}/>
              </div>
            </fieldset>
            <fieldset className='Form-Row-Double'>
              <div className='Form-Row'>
                <Input errorIdentifier={houseNumError} labelText={t('label.houseNum')}
                       errorLabelText={houseNumError}
                       inputId='houseNum' inputType='number' inputName='houseNum'
                       inputOnBlur={(e) => setHouseNum(e.target.value)}
                       inputOnChange={(e) => setHouseNum(e.target.value)}
                       inputRequired='required' autoComplete='off' value={houseNum}
                       tooltipId={t('tooltip.header.houseNum')} min={1}
                       tooltipText={t('tooltip.header.telNumOrHouseOrFlatNum')}/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={flatNumError} labelText={t('label.flatNum')}
                       errorLabelText={flatNumError}
                       inputId='flatNum' inputType='number' inputName='flatNum'
                       inputOnBlur={(e) => setFlatNum(e.target.value)} min={1}
                       inputOnChange={(e) => setFlatNum(e.target.value)} inputRequired='required'
                       autoComplete='off' tooltipId={t('tooltip.header.flatNum')}
                       tooltipText={t('tooltip.telNumOrHouseOrFlatNum')} value={flatNum}/>
              </div>
            </fieldset>
          </form>
        </React.Fragment>
      }
      <NavigationButtons page={page} nextButtonText={t('button.submit')} prevOnClickAction={() => prev()}
                         displayNext={addAddress} displayPrev={true}
                         nextButtonDisabled={!city || !street || !houseNum || !flatNum}
                         nextOnClickAction={() => {
                           sendDeliveryData();
                           next();
                         }}/>
    </section>
  );
}
