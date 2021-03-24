import React, {useContext, useState} from 'react';
import './../UI-components/form/Form.css';
import './OrderFrom.css';
import axios from 'axios';
import {Input} from '../UI-components/input/Input';
import {useTranslation} from 'react-i18next';
import {ModalContext} from '../context/modal/ModalContext';
import errorHandler from '../utils/errorHandler';
import {masks} from "../utils/inputMasks";
import {NavigationButtons} from "./OrderForm";
import {clientConfig} from "../utils/restApiConfigs";
import {clientLinks} from "../utils/restLinks";
import {logError} from "../error/errorHandler";
import CloseButton from "../UI-components/button/close/CloseButton";
import {timer} from "rxjs";

export const ContactDataPage = ({closeModal, next, page}) => {
  const {modal, setModal} = useContext(ModalContext);
  const [t] = useTranslation();
  const [nextButtonAnimation, setNextButtonAnimation] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telNum, setTelNum] = useState('');
  const [telNumPrefix, setTelNumPrefix] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telNumError, setTelNumError] = useState('');

  function sendContactData() {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      telNum: telNum
    };
    console.log(clientConfig)

    axios.post(clientLinks.order, data, clientConfig)
      .then(function (response) {
        const {success, errors} = response.data;
        if (!success && errors) {
          setNextButtonAnimation('error-shake');
          timer(600).subscribe(() => setNextButtonAnimation(''));
          if (errors.code === 500) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: 500
            });
          } else if (errors.code === 10) {
            setFirstNameError(errorHandler(errors.code));
            setLastNameError(errorHandler(errors.code));
            setEmailError(errorHandler(errors.code));
            setTelNumError(errorHandler(errors.code));
          } else {
            if (errors.firstName) {
              setFirstNameError(errorHandler(errors.firstName));
            } else {
              setFirstNameError('');
            }
            if (errors.lastName) {
              setLastNameError(errorHandler(errors.lastName));
            } else {
              setLastNameError('');
            }
            if (errors.email) {
              setEmailError(errorHandler(errors.email));
            } else {
              setEmailError('');
            }
            if (errors.telNum) {
              setTelNumError(errorHandler(errors.telNum));
            } else {
              setTelNumError('');
            }
          }
        } else {
          !localStorage.getItem('name') && localStorage.setItem('name', `${firstName} ${lastName}`);
          setFirstNameError('');
          setLastNameError('');
          setEmailError('');
          setTelNumError('');
          setFirstNameError(null);
          setLastNameError(null);
          setEmailError(null);
          setTelNumError(null);
          next();
        }
      })
      .catch((error) => logError(error));
  }

  return (
    <section className={'Contact-Data-Page fill-height fill-width ' + (page !== 2 && 'none')}>
      <header className='Clients-Data-Header fill-width'>
        <h1>{t('orderForm.contact.header')}</h1>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate={true}/>
      </header>
      <form className='Form fill-width'>
        <fieldset className='Form-Row-Double Optional Without-Ruler'>
          <div className='Form-Row'>
            <Input errorIdentifier={firstNameError} labelText={t('label.firstName')}
                   errorLabelText={firstNameError}
                   inputId='firstName' inputType='text' inputName='firstName'
                   inputOnBlur={(e) => setFirstName(e.target.value)}
                   inputOnChange={(e) => setFirstName(e.target.value)} inputRequired='required' autoComplete='off'
                   tooltipId={t('tooltip.header.firstName')} tooltipText={t('tooltip.name')} value={firstName}/>
          </div>
          <div className='Form-Row'>
            <Input errorIdentifier={lastNameError} labelText={t('label.lastName')}
                   errorLabelText={lastNameError}
                   inputId='lastName' inputType='text' inputName='lastName'
                   inputOnBlur={(e) => setLastName(e.target.value)}
                   inputOnChange={(e) => setLastName(e.target.value)} inputRequired='required' autoComplete='off'
                   tooltipId={t('tooltip.header.lastName')} tooltipText={t('tooltip.name')} value={lastName}/>
          </div>
        </fieldset>
        <fieldset className='Form-Row-Double Optional'>
          <div className='Form-Row'>
            <Input errorIdentifier={emailError} labelText={t('label.email')}
                   errorLabelText={emailError} inputId='email' inputType='email' inputName='email'
                   inputOnBlur={(e) => setEmail(e.target.value)}
                   inputOnChange={(e) => setEmail(e.target.value)}
                   inputRequired='required' autoComplete='off'
                   tooltipId={t('tooltip.header.email')} tooltipText={t('tooltip.email')} value={email}/>
          </div>
          <p className='font-weight_900 h1-size Ruler'>
            {t('orderForm.contact.or')}
          </p>
          <div className='Form-Row'>
            <Input errorIdentifier={telNumError} labelText={t('label.tel')}
                   errorLabelText={telNumError} mask={masks.tel}
                   selectOnChange={(event) => setTelNumPrefix(event.target.value)} selectValue={telNumPrefix}
                   inputId='telNum' inputType='tel' inputName='telNum'
                   inputOnBlur={(e) => setTelNum(e.target.value)}
                   inputOnChange={(e) => setTelNum(e.target.value)} inputRequired='required' autoComplete='off'
                   tooltipId={t('tooltip.header.telNum')} tooltipText={t('tooltip.telNumOrHouseOrFlatNum')}
                   value={telNum}/>
          </div>
        </fieldset>
      </form>
      <NavigationButtons page={page} nextButtonText={t('button.submit')}
                         displayNext={true} displayPrev={false}
                         nextButtonDisabled={!firstName || !lastName || !(email || telNum)}
                         nextOnClickAction={() => sendContactData()} nextButtonAnimation={nextButtonAnimation}/>
    </section>
  );
}