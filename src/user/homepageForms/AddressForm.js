import {Form} from "../../UI-components/form/Form";
import {Select} from "../../UI-components/select/Select";
import {Input} from "../../UI-components/input/Input";
import ConfirmButton from "../../UI-components/button/ConfirmButton";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {publicLinks, userLinks} from "../../utils/restLinks";
import {logError} from "../../error/errorHandler";
import {useTranslation} from "react-i18next";
import {userConfig} from "../../utils/restApiConfigs";
import errorHandler from "../../utils/errorHandler";
import i18n from "i18next";
import {timer} from "rxjs";
import {ModalContext} from "../../context/modal/ModalContext";
import AuthContext from "../../context/auth/AuthContext";
import useWindowDimensions from "../../utils/isTouchDevice";

export const AddressForm = () => {
  const authContext = useContext(AuthContext);
  const {modal, setModal} = useContext(ModalContext);
  const {width} = useWindowDimensions();

  const [t] = useTranslation();
  const [animateAddressChange, setAnimateAddressChange] = useState(false);
  const [addressSuccess, setAddressSuccess] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  const [address, setAddress] = useState({
    city: '',
    street: '',
    houseNum: '',
    flatNum: ''
  });

  const [addressError, setAddressError] = useState({
    cityError: '',
    streetError: '',
    houseNumError: '',
    flatNumError: ''
  });

  useEffect(() => {
    _getAvailableCities();
  }, [t]);

  function _getAvailableCities() {
    axios.get(publicLinks.availableCities(i18n.language))
      .then((response) => {
        const {success, data, errors} = response.data;
        if (success && !errors) {
          setAvailableCities(data);
        }
      }).catch((e) => logError(e));
  }

  function addAddress() {
    const newAddress = {
      city: address.city,
      street: address.street,
      houseNum: Number.parseInt(address.houseNum),
      flatNum: Number.parseInt(address.flatNum)
    };
    axios.post(userLinks.addAddress, newAddress, userConfig)
      .then((response) => {
        const {success, errors} = response.data;
        if (!success && errors) {
          setAnimateAddressChange(true);
          timer(400).subscribe(() => setAnimateAddressChange(false));
          if (errors.code === 500 || errors.code === 600) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: errors.code
            });
          } else if (errors.code === 10) {
            setAddressError({
              cityError: errorHandler(errors.code),
              streetError: errorHandler(errors.code),
              houseNumError: errorHandler(errors.code),
              flatNumError: errorHandler(errors.code)
            });
          } else {
            if (errors.city) {
              setAddressError({
                ...addressError,
                cityError: errorHandler(errors.city)
              });
            } else {
              setAddressError({
                ...addressError,
                cityError: ''
              });
            }
            if (errors.street) {
              setAddressError({
                ...addressError,
                streetError: errorHandler(errors.street)
              });
            } else {
              setAddressError({
                ...addressError,
                streetError: ''
              });
            }
            if (errors.houseNum) {
              setAddressError({
                ...addressError,
                houseNumError: errorHandler(errors.houseNum)
              });
            } else {
              setAddressError({
                ...addressError,
                houseNumError: ''
              });
            }
            if (errors.flatNum) {
              setAddressError({
                ...addressError,
                flatNumError: errorHandler(errors.flatNum)
              });
            } else {
              setAddressError({
                ...addressError,
                flatNumError: ''
              });
            }
          }
        } else {
          authContext.addDeliveryAddress(address);
          setAddressSuccess(true);
          setTimeout(() => {
            setAddressSuccess(false);
          }, 400)
          // setStateChange(true);
          // setTimeout(() => {
          //   setStateChange(false);
          // }, 200);
          setAddress({
            city: '',
            street: '',
            houseNum: '',
            flatNum: ''
          });
          setAddressError({
            cityError: '',
            streetError: '',
            houseNumError: '',
            flatNumError: ''
          });
        }
      }).catch((error) => logError(error));
  }

  const citySelect =
    <div className='Form-Row fill-width'>
      <Select selectName='city' selectOnBlur={(event) => setAddress({...address, city: event.target.value})}
              selectOnChange={(event) => setAddress({...address, city: event.target.value})} value={address.city}
              errorIdentifier={addressError.cityError} errorLabelText={addressError.cityError}
              labelText={t('label.city')}
              selectId='city'>
        <option value={0}>
          {t('homepage.selectCity')}
        </option>
        {availableCities && availableCities.map((item) => {
          return (
            <option key={item.city} value={item.city}>
              {item.city}
            </option>
          );
        })}
      </Select>
    </div>;
  const streetCell =
    <div className='Form-Row fill-width'>
      <Input errorIdentifier={addressError.streetError} labelText={t('label.street')}
             errorLabelText={addressError.streetError}
             inputId='street' inputType='text' inputName='street'
             inputOnBlur={(event) => setAddress({...address, street: event.target.value})}
             inputOnChange={(event) => setAddress({...address, street: event.target.value})}
             inputRequired='required'
             autoComplete='on' overlayPlacement="bottom"
             value={address.street} tooltipId={t('tooltip.header.street')} tooltipText={t('tooltip.street')}/>
    </div>;
  const houseNumCell =
    <div className='Form-Row fill-width'>
      <Input errorIdentifier={addressError.houseNumError} labelText={t('label.houseNum')}
             errorLabelText={addressError.houseNumError}
             inputId='houseNum' inputType='number' inputName='houseNum'
             inputOnBlur={(event) => setAddress({...address, houseNum: event.target.value})} min={1}
             inputOnChange={(event) => setAddress({...address, houseNum: event.target.value})}
             inputRequired='required' autoComplete='off' value={address.houseNum}
             tooltipId={t('tooltip.header.houseNum')} overlayPlacement="bottom"
             tooltipText={t('tooltip.telNumOrHouseOrFlatNum')}/>
    </div>;
  const flatNumCell =
    <div className='Form-Row fill-width'>
      <Input errorIdentifier={addressError.flatNumError} labelText={t('label.flatNum')}
             errorLabelText={addressError.flatNumError}
             inputId='flatNum' inputType='number' inputName='flatNum'
             inputOnBlur={(event) => setAddress({...address, flatNum: event.target.value})} min={1}
             inputOnChange={(event) => setAddress({...address, flatNum: event.target.value})}
             inputRequired='required' overlayPlacement="bottom"
             autoComplete='off' tooltipId={t('tooltip.header.flatNum')}
             tooltipText={t('tooltip.telNumOrHouseOrFlatNum')} value={address.flatNum}/>
    </div>;

  return (
    <Form id='addresses' success={addressSuccess} className={width < 769 ? 'Flex F-F-C-N A-I-C J-C-C' : undefined}>
      {width > 768 ?
        <React.Fragment>
          <div className='Form-Col Col-First'>
            {citySelect}
            {streetCell}
          </div>
          <div className='Form-Col Col-Second'>
            {houseNumCell}
            {flatNumCell}
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          {citySelect}
          {streetCell}
          {houseNumCell}
          {flatNumCell}
        </React.Fragment>
      }
      <div className='Form-Button'>
        <ConfirmButton onClick={() => addAddress()}
                       disabled={!address.city || !address.street || !address.houseNum || !address.flatNum}
                       animate={animateAddressChange} className='button-small-x-wide' text={t('button.submit')}/>
      </div>
    </Form>
  );
}
