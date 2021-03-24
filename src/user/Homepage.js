import React, {useContext, useEffect, useState} from 'react';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import errorHandler from '../utils/errorHandler';
import './Homepage.css';
import i18n from 'i18next';
import timeConverter from '../utils/dateConverter';
import {ModalContext} from "../context/modal/ModalContext";
import {masks} from "../utils/inputMasks";
import {LoadingOverlay} from "../UI-components/overlay/loading/LoadingOverlay";
import {Form} from "../UI-components/form/Form";
import ConfirmButton from "../UI-components/button/ConfirmButton";
import {Select} from "../UI-components/select/Select";
import AuthContext from "../context/auth/AuthContext";
import CloseButton from "../UI-components/button/close/CloseButton";
import {Helmet} from "react-helmet";
import {publicLinks, userLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import {timer} from "rxjs";
import {userConfig} from "../utils/restApiConfigs";

export default function Homepage() {
  const [t] = useTranslation();
  const {modal, setModal} = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  const [orders, setOrders] = useState(new Map([]));
  const [orderId, setOrderId] = useState(null);

  const [stateChange, setStateChange] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState('');
  const [searchError, setSearchError] = useState('');

  const [animatePasswordChange, setAnimatePasswordChange] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const [animateEmailChange, setAnimateEmailChange] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldEmailError, setOldEmailError] = useState('');
  const [newEmailError, setNewEmailError] = useState('');

  const [animateTelNumChange, setAnimateTelNumChange] = useState(false);
  const [telNumChangeSuccess, setTelNumChangeSuccess] = useState(false);
  const [oldTelNum, setOldTelNum] = useState('');
  const [newTelNum, setNewTelNum] = useState('');
  const [oldTelNumError, setOldTelNumError] = useState('');
  const [newTelNumError, setNewTelNumError] = useState('');
  const [oldTelNumPrefix, setOldTelNumPrefix] = useState('+38 ');
  const [newTelNumPrefix, setNewTelNumPrefix] = useState('+38 ');

  const [animateAddressChange, setAnimateAddressChange] = useState(false);
  const [addressSuccess, setAddressSuccess] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNum, setHouseNum] = useState('');
  const [flatNum, setFlatNum] = useState('');
  const [cityError, setCityError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [houseNumError, setHouseNumError] = useState('');
  const [flatNumError, setFlatNumError] = useState('');
  let language = i18n.language;

  useEffect(() => {
    if (stateChange) {
      getOrders();
    }
  }, [stateChange]);

  useEffect(() => {
    getOrders();
    authContext.checkState();
    if (!localStorage.getItem('addresses') || !JSON.parse(localStorage.getItem('addresses'))) {
      getDeliveryAddresses();
    } else {
      timer(100).subscribe(() => authContext.loadDeliveryAddresses());
    }
  }, []);

  // useEffect(()=>{
  //   getDeliveryAddresses();
  // }, [t]);

  useEffect(() => {
    _getAvailableCities();
  }, [t]);

  function _getAvailableCities() {
    axios.get(publicLinks.availableCities(language))
      .then((response) => {
        const {success, data, errors} = response.data;
        if (success && !errors) {
          setAvailableCities(data);
        }
      }).catch((e) => logError(e));
  }

  function _activateAnimation(type) {
    switch (type) {
      case 'address':
        setAnimateAddressChange(true);
        timer(600).subscribe(() => setAnimateAddressChange(false));
        break;
      case 'email':
        setAnimateEmailChange(true);
        timer(600).subscribe(() => setAnimateEmailChange(false));
        break;
      case 'pass':
        setAnimatePasswordChange(true);
        timer(600).subscribe(() => setAnimatePasswordChange(false));
        break;
      case 'tel':
        setAnimateTelNumChange(true);
        timer(600).subscribe(() => setAnimateTelNumChange(false));
        break;
      default:
        break;
    }
  }

  function getOrders() {
    axios.get(userLinks.orders(language), userConfig)
      .then(response => {
        const {success, errors, data} = response.data;
        if (success) {
          let ordersTemp = new Map([]);
          for (let i = 0; i < data.length; i++) {
            ordersTemp.set(data[i].id, data[i])
          }
          setOrders(ordersTemp);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: errors.code
          });
        }
      }).catch((error) => logError(error));
  }

  function addAddress() {
    const address = {
      city: city,
      street: street,
      houseNum: Number.parseInt(houseNum),
      flatNum: Number.parseInt(flatNum)
    };
    axios.post(userLinks.addAddress, address, userConfig)
      .then((response) => {
        console.log(response)
        const {success, errors} = response.data;
        if (!success && errors) {
          _activateAnimation('address');
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
              setCityError(null);
            }
            if (errors.street) {
              setStreetError(errorHandler(errors.street));
            } else {
              setStreetError(null);
            }
            if (errors.houseNum) {
              setHouseNumError(errorHandler(errors.houseNum));
            } else {
              setHouseNumError(null);
            }
            if (errors.flatNum) {
              setFlatNumError(errorHandler(errors.flatNum));
            } else {
              setFlatNumError(null);
            }
          }
        } else {
          authContext.addDeliveryAddress(address);
          setAddressSuccess(true);
          setTimeout(() => {
            setAddressSuccess(false);
          }, 800)
          setStateChange(true);
          setTimeout(() => {
            setStateChange(false);
          }, 200);
          setCity('');
          setStreet('');
          setHouseNum('');
          setFlatNum('');
          setCityError(null);
          setStreetError(null);
          setHouseNumError(null);
          setFlatNumError(null);
        }
      }).catch((error) => logError(error));
  }

  function getDeliveryAddresses() {
    axios.get(userLinks.deliveryAddresses, userConfig).then(response => {
      const {success, data, errors} = response.data;
      console.log(response.data)
      if (success && !errors) {
        localStorage.setItem('addresses', JSON.stringify(data));
        authContext.loadDeliveryAddresses();
      } else {
        setModal({
          ...modal,
          internalError: true,
          errorCode: errors.code
        })
      }
    }).catch((error) => logError(error));
  }

  function deleteDeliveryAddress(id) {
    axios.delete(userLinks.deleteDeliveryAddress(id), userConfig)
      .then(response => {
        const {success, errors} = response.data;
        if (success && !errors) {
          authContext.removeDeliveryAddress(id);
          setStateChange(true);
          setTimeout(() => {
            setStateChange(false);
          }, 200);
        } else {
          setModal({
            ...modal,
            internalError: true,
            errorCode: errors.code
          })
        }
      }).catch((error) => logError(error));
    // axios.delete('http://localhost:5000/api/protected/user/auth/addresses/delete/' + id,
    //   {
    //     headers: {
    //       Token: localStorage.getItem('token'),
    //       'Refresh-Token': localStorage.getItem('refreshToken'),
    //       withCredentials: true
    //     }
    //   })
    //   .then(response => {
    //     const {success, errors} = response.data;
    //     if (!success && errors) {
    //       if (errors.code === 500 || errors.code === 600) {
    //         setModal({
    //           ...modal,
    //           internalError: true,
    //           errorCode: errors.code
    //         })
    //       }
    //     } else {
    //       let addressTemp = addresses;
    //       let index = addressTemp.indexOf(event.target.value);
    //       if (index !== -1) {
    //         addressTemp.splice(index, 1);
    //         setAddresses(addressTemp);
    //       }
    //       setStateChange(true);
    //     }
    //   }).catch((error) => console.log(error));
  }

  function passwordChange() {
    axios.post(userLinks.changePassword,
      {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, userConfig
    ).then(async (response) => {
      const {success, errors} = response.data;
      if (!success && errors) {
        _activateAnimation('pass');
        if (errors.code === 500 || errors.code === 600) {
          setModal({
            ...modal,
            internalError: true,
            errorCode: errors.code
          })
        } else if (errors.code === 10) {
          setOldPasswordError(errorHandler(errors.code));
          setNewPasswordError(errorHandler(errors.code));
        } else {
          if (errors.oldPassword) {
            setOldPasswordError(errorHandler(errors.oldPassword));
          } else {
            setOldPasswordError(null);
          }
          if (errors.newPassword) {
            setNewPasswordError(errorHandler(errors.newPassword));
          } else {
            setNewPasswordError(null);
          }
        }
      } else {
        setPasswordChangeSuccess(true);
        setTimeout(() => {
          setPasswordChangeSuccess(false);
        }, 2000);
        setOldPassword('');
        setNewPassword('');
        setOldPasswordError(null);
        setNewPasswordError(null);
      }
    }).catch((error) => logError(error));
  }

  function emailChange() {
    axios.post(userLinks.changeEmail,
      {
        oldEmail: oldEmail,
        newEmail: newEmail
      }, userConfig
    ).then((response) => {
      const {success, errors} = response.data;
      if (!success && errors) {
        _activateAnimation('email');
        if (errors.code === 500 || errors.code === 600) {
          setModal({
            ...modal,
            internalError: true,
            errorCode: errors.code
          })
        } else if (errors.code === 10) {
          setOldEmailError(errorHandler(errors.code));
          setNewEmailError(errorHandler(errors.code));
        } else {
          if (errors.oldEmail) {
            setOldEmailError(errorHandler(errors.oldEmail));
          } else {
            setOldEmailError(null);
          }
          if (errors.newEmail) {
            setNewEmailError(errorHandler(errors.newEmail));
          } else {
            setNewEmailError(null);
          }
        }
      } else {
        setEmailChangeSuccess(true);
        setTimeout(() => {
          setEmailChangeSuccess(false);
        }, 2000)
        setOldEmail('');
        setNewEmail('');
        setOldEmailError(null);
        setNewEmailError(null);
      }
    }).catch((error) => logError(error));
  }

  function telNumChange() {
    axios.post(userLinks.changeTelNum,
      {
        oldTelNum: oldTelNumPrefix + oldTelNum,
        newTelNum: newTelNumPrefix + newTelNum
      }, userConfig
    ).then((response) => {
      const {success, errors} = response.data;
      if (!success && errors) {
        _activateAnimation('tel');
        if (errors.code === 500 || errors.code === 600) {
          setModal({
            ...modal,
            internalError: true,
            errorCode: errors.code
          })
        } else if (errors.code === 10) {
          setOldTelNumError(errorHandler(errors.code));
          setNewTelNumError(errorHandler(errors.code));
        } else {
          if (errors.oldTelNum) {
            setOldTelNumError(errorHandler(errors.oldTelNum));
          } else {
            setOldTelNumError(null);
          }
          if (errors.newTelNum) {
            setNewTelNumError(errorHandler(errors.newTelNum));
          } else {
            setNewTelNumError(null);
          }
        }
      } else {
        setTelNumChangeSuccess(true);
        setTimeout(() => {
          setTelNumChangeSuccess(false);
        }, 2000)
        setOldTelNum('');
        setNewTelNum('');
        setOldTelNumError(null);
        setNewTelNumError(null);
      }
    }).catch((error) => logError(error));
  }

  function searchOrder() {
    axios.get(userLinks.searchOrder(keyword), userConfig)
      .then((response) => {
        const {success, data, errors} = response.data;
        if (!success && errors) {
          const errors = data.errors;
          if (errors.code === 500 || errors.code === 600) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: errors.code
            })
          } else if (errors.code === 10) {
            setSearchError(errorHandler(errors.code));
          }
        } else {
          setOrders(data);
        }
      }).catch((error) => logError(error));
  }

  const handleSearch = (event) => {
    if (event.target.name === 'search') {
      if (event.target.value.length === 0) {
        getOrders();
      }
      setKeyword(event.target.value);
    }
  };

  return (
    <div className='Homepage Nunito'>
      <Helmet>
        <title>
          Homepage
        </title>
        <meta name="description" content="Register an account or log in if you have one to access all features."/>
      </Helmet>
      <section id='orders' className='TopBlock'>
        <section className='LeftCol'>
          <header className='Form-Header Playfair'>
            <h3>{t('homepage.orders.header')}</h3>
          </header>
          <Input tooltipId='search' inputType='search' inputName='search' autoComplete='off'
                 inputOnBlur={(event) => handleSearch(event)} inputOnChange={(event) => handleSearch(event)}
                 value={keyword} buttonOnClick={() => searchOrder()}/>
          <ul className={'Orders-List ' + (orders.size % 2 ? 'Even' : 'Odd')}>
            <li className='Orders-Header fill-width'>
              <span>Date</span>
              <span>Products</span>
              <span>Price</span>
            </li>
            {orders ? Array.from(orders.values()).map((order) => {
              return (
                <li key={order.date} className='Order fill-width'>
                  <button onClick={() => setOrderId(order.id)} type='button'
                          className='button Orders-Cell fill-width '>
                    <span className='Date'>{timeConverter(Number.parseInt(order.date), i18n.language, true)}</span>
                    <span className='Products'>
                      {order.products.map((product) => {
                        return product + ', ';
                      })}
                    </span>
                    <span className='Total'>{order.price}</span>
                  </button>
                </li>);
            }) : null}
          </ul>
        </section>
        <section className='RightCol'>
          <LoadingOverlay
            active={!orders}
            text={t('overlay.getting')}>
            {orderId ?
              <div className='Order-Data-Table'>
                <div className='OrderDate-Row h5-size font-weight_300'>
                  {t('homepage.orders.orderData.time')} {timeConverter(Number.parseInt(orders.get(orderId).date), i18n.language, false)}
                </div>
                <div className='Products-Column'>
                  <header>
                    <h4 className='font-weight_600'>{t('homepage.orders.orderData.products')}</h4>
                  </header>
                  <ul className='Products-List fill-width fill-height'>
                    {orders && orders.get(orderId).products.map((product) => {
                      return <li key={product}>{product}</li>;
                    })}
                  </ul>
                </div>
                <div className='Comment-Column'>
                  <div className='Order-Comment'>
                    <header>
                      <h4 className='font-weight_600'>{t('homepage.orders.orderData.comment')}</h4>
                    </header>
                    <p>
                      {orders.get(orderId).comment}
                    </p>
                  </div>
                  <div className='Order-Total'>
                    <h4 className='font-weight_600'>
                      <span>{t('homepage.orders.orderData.comment')}</span>
                      <span>{orders.get(orderId).price}$</span>
                    </h4>
                  </div>
                </div>
              </div>
              :
              null}
          </LoadingOverlay>
        </section>
      </section>
      <section className='MiddleBlock'>
        <section className='LeftCol'>
          <header className='Form-Header fill-width'>
            <h3>{t('homepage.forms.addAddress.header')}</h3>
          </header>
          <Form id='addresses' success={addressSuccess}>
            <div className='Form-Col Col-First'>
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
                <Input errorIdentifier={streetError} labelText={t('homepage.forms.addAddress.label.street')}
                       errorLabelText={streetError}
                       inputId='street' inputType='text' inputName='street'
                       inputOnBlur={(event) => setStreet(event.target.value)}
                       inputOnChange={(event) => setStreet(event.target.value)} inputRequired='required'
                       autoComplete='on'
                       value={street} tooltipId='street' tooltipText='asdsad'/>
              </div>
            </div>
            <div className='Form-Col Col-Second'>
              <div className='Form-Row'>
                <Input errorIdentifier={houseNumError} labelText={t('homepage.forms.addAddress.label.houseNum')}
                       errorLabelText={houseNumError}
                       inputId='houseNum' inputType='number' inputName='houseNum'
                       inputOnBlur={(event) => setHouseNum(event.target.value)} min={1}
                       inputOnChange={(event) => setHouseNum(event.target.value)}
                       inputRequired='required' autoComplete='off' value={houseNum} tooltipId='houseNum'
                       tooltipText='asdsad'/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={flatNumError} labelText={t('homepage.forms.addAddress.label.flatNum')}
                       errorLabelText={flatNumError}
                       inputId='flatNum' inputType='number' inputName='flatNum'
                       inputOnBlur={(event) => setFlatNum(event.target.value)} min={1}
                       inputOnChange={(event) => setFlatNum(event.target.value)} inputRequired='required'
                       autoComplete='off' tooltipId='flatNum' tooltipText='asdsad' value={flatNum}/>
              </div>
            </div>
            <div className='Form-Button'>
              <ConfirmButton onClick={() => addAddress()} disabled={!city || !street || !houseNum || !flatNum}
                             animate={animateAddressChange} className='button-small-x-wide'
                             type='button' ariaLabel={t('homepage.forms.button.submit')}
                             text={t('homepage.forms.button.submit')}>
              </ConfirmButton>
            </div>
          </Form>
        </section>
        <section className='RightCol'>
          <header className='Form-Header'>
            <h3>Your Delivery Addresses</h3>
          </header>
          <ul
            className={'Addresses-Table ' + (authContext.addresses && authContext.addresses.length % 2 ? 'Even' : 'Odd')}>
            {authContext.addresses &&
            authContext.addresses.map((address) => {
              return (
                <li key={address.street + address.flatNum} className='Addresses-Cell fill-width'>
                  <div className='Content'>
                    <span>
                      {`${t('city')} ${address.city},`}
                    </span>
                    <span>
                      {`${t('street')} ${address.street} ${address.houseNum}, ${t('flat')} № ${address.flatNum}.`}
                    </span>
                  </div>
                  <div className='Remove-Button'>
                    <CloseButton onClick={() => deleteDeliveryAddress(address.id)}
                                 animate={true} ariaLabel={t('aria-label.removeAddress')}/>
                  </div>
                </li>);
            })}
          </ul>
        </section>
      </section>
      <section id='forms' className='BottomBlock'>
        <div className='Block-Wrapper fill-width'>
          <section className='Col Col-First'>
            <header className='fill-width'>
              <h3>Email Change</h3>
            </header>
            <Form success={emailChangeSuccess}>
              <div className='Form-Row'>
                <Input errorIdentifier={oldEmailError} labelText={t('homepage.forms.changeEmail.label.oldEmail')}
                       errorLabelText={oldEmailError} value={oldEmail}
                       inputId='oldEmail' inputType='email' inputName='oldEmail'
                       inputOnBlur={(event) => setOldEmail(event.target.value)}
                       inputOnChange={(event) => setOldEmail(event.target.value)} inputRequired='required'
                       autoComplete='off' tooltipId='oldEmail' tooltipText='oldEmail'/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={newEmailError} labelText={t('homepage.forms.changeEmail.label.newEmail')}
                       errorLabelText={newEmailError} value={newEmail}
                       inputId='newEmail' inputType='email' inputName='newEmail'
                       inputOnBlur={(event) => setNewEmail(event.target.value)}
                       inputOnChange={(event) => setNewEmail(event.target.value)}
                       inputRequired='required' autoComplete='off' tooltipId='newEmail' tooltipText='newEmail'/>
              </div>
              <div className='Form-Button'>
                <ConfirmButton onClick={() => emailChange()} disabled={!oldEmail || !newEmail}
                               animate={animateEmailChange} className='button-small-x-wide'
                               type='button' ariaLabel={t('homepage.forms.button.submit')}
                               text={t('homepage.forms.button.submit')}>
                </ConfirmButton>
              </div>
            </Form>
          </section>
          <section className='Col Col-Second'>
            <header className='fill-width'>
              <h3>Password Change</h3>
            </header>
            <Form success={passwordChangeSuccess}>
              <div className='Form-Row'>
                <Input errorIdentifier={oldPasswordError}
                       labelText={t('homepage.forms.changePassword.label.oldPassword')}
                       errorLabelText={oldPasswordError} value={oldPassword}
                       inputId='oldPassword' inputType='password' inputName='oldPassword'
                       inputOnBlur={(event) => setOldPassword(event.target.value)}
                       inputOnChange={(event) => setOldPassword(event.target.value)} inputRequired='required'
                       autoComplete='off'
                       tooltipId='oldPassword' tooltipText='oldPassword'/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={newPasswordError}
                       labelText={t('homepage.forms.changePassword.label.newPassword')}
                       errorLabelText={newPasswordError} value={newPassword}
                       inputId='newPassword' inputType='password' inputName='newPassword'
                       inputOnBlur={(event) => setNewPassword(event.target.value)}
                       inputOnChange={(event) => setNewPassword(event.target.value)}
                       inputRequired='required' autoComplete='off'
                       tooltipId='newPassword' tooltipText='newPassword'/>
              </div>
              <div className='Form-Button'>
                <ConfirmButton onClick={() => passwordChange()} disabled={!oldPassword || !newPassword}
                               animate={animatePasswordChange} className='button-small-x-wide'
                               type='button' ariaLabel={t('homepage.forms.button.submit')}
                               text={t('homepage.forms.button.submit')}>
                </ConfirmButton>
              </div>
            </Form>
          </section>
          <section className='Col Col-Third'>
            <header className='fill-width'>
              <h3>Telephone Number Change</h3>
            </header>
            <Form success={telNumChangeSuccess}>
              <div className='Form-Row'>
                <Input errorIdentifier={oldTelNumError} labelText={t('homepage.forms.changeTelNum.label.oldTelNum')}
                       errorLabelText={oldTelNumError} value={oldTelNum}
                       inputId='oldTelNum' inputType='tel' inputName='oldTelNum'
                       inputOnBlur={(event) => setOldTelNum(event.target.value)}
                       inputOnChange={(event) => setOldTelNum(event.target.value)} inputRequired='required'
                       autoComplete='off'
                       selectOnChange={(event) => setOldTelNumPrefix(event.target.value)} selectValue={oldTelNumPrefix}
                       tooltipId='oldTelNum' tooltipText='oldTelNum'
                       mask={masks.tel}/>
              </div>
              <div className='Form-Row'>
                <Input errorIdentifier={newTelNumError} labelText={t('homepage.forms.changeTelNum.label.newTelNum')}
                       errorLabelText={newTelNumError} value={newTelNum}
                       inputId='newTelNum' inputType='tel' inputName='newTelNum'
                       inputOnBlur={(event) => setNewTelNum(event.target.value)}
                       inputOnChange={(event) => {
                         setNewTelNum(event.target.value)
                       }}
                       selectOnChange={(event) => setNewTelNumPrefix(event.target.value)} selectValue={newTelNumPrefix}
                       inputRequired='required' autoComplete='off'
                       tooltipId='newTelNum' tooltipText='newTelNum'
                       mask={masks.tel}/>
              </div>
              <div className='Form-Button'>
                <ConfirmButton onClick={() => telNumChange()} disabled={!oldTelNum || !newTelNum}
                               animate={animateTelNumChange} className='button-small-x-wide'
                               type='button' ariaLabel={t('homepage.forms.button.submit')}
                               text={t('homepage.forms.button.submit')}>
                </ConfirmButton>
              </div>
            </Form>
          </section>
        </div>
      </section>
    </div>
  );
}