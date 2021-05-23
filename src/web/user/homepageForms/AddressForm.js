import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { timer } from 'rxjs';
import i18n from 'i18next';
import axios from 'axios';
import ConfirmButton from '../../UI-components/button/ConfirmButton';
import { ModalContext } from '../../context/modal/ModalContext';
import { publicLinks, userLinks } from '../../utils/restLinks';
import useWindowDimensions from '../../utils/useWindowDimensions';
import AuthContext from '../../context/auth/AuthContext';
import { Input } from '../../UI-components/input/Input';
import { Form } from '../../UI-components/form/Form';
import { logError } from '../../error/errorHandler';
import errorHandler from '../../utils/errorHandler';

export const AddressForm = () => {
  const [ t ] = useTranslation();
  const [animateAddressChange, setAnimateAddressChange] = useState(false);
  const [addressSuccess, setAddressSuccess] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  const authContext = useContext(AuthContext);
  const { modal, setModal } = useContext(ModalContext);
  const { width } = useWindowDimensions();

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
  }, [ t ]);

  async function _getAvailableCities() {
    availableCities.length === 0 && await axios.get(publicLinks.availableCities(i18n.languages[0]))
      .then((response) => {
        const { success, data, errors } = response.data;

        if (success && !errors) {
          setAvailableCities(data);
        }
      }).catch((e) => logError(e));
  }

  function addAddress() {
    const newAddress = {
      city: address.city,
      street: address.street,
      houseNum: Number.parseInt(address.houseNum, 10),
      flatNum: Number.parseInt(address.flatNum, 10)
    };

    timer(50).subscribe(async () =>
      axios.post(userLinks.addDeliveryAddress, newAddress, {
        headers: {
          Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
          'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
            ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
          withCredentials: true
        }
      })
        .then((response) => {
          const { success, errors } = response.data;

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
            }, 400);
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
        }).catch((error) => logError(error))
    );
  }

  const citySelect = (
    <div className="Form-R Grid F-W">
      <label htmlFor="city-dropdown" className="Form-L F-W h6-size" tabIndex="-1">
        {t('label.city')}
      </label>
      <Dropdown onSelect={(eventKey) => setAddress({ ...address, city: eventKey })}
        className="F-W">
        <Dropdown.Toggle variant={null} id="city-dropdown" className="F-W Btn-S Form-Sel">
          {!address.city ? t('homepage.selectCity') : address.city}
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
      <p className={addressError.cityError ? 'Form-L-E Italic F-W Flex' : 'None'}>
        {addressError.cityError ? addressError.cityError : null}
      </p>
    </div>
  );
  const streetCell = (
    <div className="Form-R Grid F-W">
      <Input errorIdentifier={addressError.streetError} labelText={t('label.street')}
        errorLabelText={addressError.streetError}
        inputId="street" inputType="text" inputName="street"
        inputOnBlur={(event) => setAddress({ ...address, street: event.target.value })}
        inputOnChange={(event) => setAddress({ ...address, street: event.target.value })}
        inputRequired="required"
        autoComplete="on" overlayPlacement="bottom"
        value={address.street} tooltipId={t('tooltip.header')} tooltipText={t('tooltip.street')}
      />
    </div>
  );
  const houseNumCell = (
    <div className="Form-R Grid F-W">
      <Input errorIdentifier={addressError.houseNumError} labelText={t('label.houseNum')}
        errorLabelText={addressError.houseNumError}
        inputId="houseNum" inputType="number" inputName="houseNum"
        inputOnBlur={(event) => setAddress({ ...address, houseNum: event.target.value })} min={1}
        inputOnChange={(event) => setAddress({ ...address, houseNum: event.target.value })}
        inputRequired="required" autoComplete="off" value={address.houseNum}
        tooltipId={t('tooltip.header')} overlayPlacement="bottom"
        tooltipText={t('tooltip.telNumOrHouseOrFlatNum')}
      />
    </div>
  );
  const flatNumCell = (
    <div className="Form-R Grid F-W">
      <Input errorIdentifier={addressError.flatNumError} labelText={t('label.flatNum')}
        errorLabelText={addressError.flatNumError}
        inputId="flatNum" inputType="number" inputName="flatNum"
        inputOnBlur={(event) => setAddress({ ...address, flatNum: event.target.value })} min={1}
        inputOnChange={(event) => setAddress({ ...address, flatNum: event.target.value })}
        inputRequired="required" overlayPlacement="bottom"
        autoComplete="off" tooltipId={t('tooltip.header')}
        tooltipText={t('tooltip.telNumOrHouseOrFlatNum')} value={address.flatNum}
      />
    </div>
  );

  return (
    <Form id="addresses" success={addressSuccess} className={width < 769 ? 'Flex F-F-C-N A-I-C J-C-C' : ''}>
      {width > 768 ? (
        <React.Fragment>
          <div className="Form-Col Flex F-F-C-N F-C">
            {citySelect}
            {streetCell}
          </div>
          <div className="Form-Col Flex F-F-C-N S-C">
            {houseNumCell}
            {flatNumCell}
          </div>
        </React.Fragment>
        )
        : (
          <React.Fragment>
            {citySelect}
            {streetCell}
            {houseNumCell}
            {flatNumCell}
          </React.Fragment>
        )}
      <div className="Form-B">
        <ConfirmButton onClick={() => addAddress()}
          disabled={!address.city || !address.street || !address.houseNum || !address.flatNum}
          error={animateAddressChange} className="Btn-Sm-X-W" text={t('button.submit')}
        />
      </div>
    </Form>
  );
};
