import React, {useContext, useState} from 'react';
import './../UI-components/form/Form.css';
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
import useWindowDimensions from "../utils/isTouchDevice";
import {Carousel} from "react-bootstrap";
import {NextIcon, PrevIcon} from "../UI-components/icons/Icons";

export const ContactDataPage = ({closeModal, next, page}) => {
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

  const {modal, setModal} = useContext(ModalContext);
  const {width, height} = useWindowDimensions();

  function sendContactData() {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      telNum: telNum
    };

    axios.post(clientLinks.order, data, clientConfig)
      .then((response) => {
        const {success, errors} = response.data;
        if (!success && errors) {
          setNextButtonAnimation('error-shake');
          timer(400).subscribe(() => setNextButtonAnimation(''));
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
              setEmailError(() => errorHandler(errors.email));
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
          setFirstNameError('');
          setLastNameError('');
          setEmailError('');
          setTelNumError('');
          setFirstNameError('');
          setLastNameError('');
          setEmailError('');
          setTelNumError('');
          next();
        }
      })
      .catch((error) => logError(error));
  }

  const firstNameCell =
    <div className='Form-Row fill-width'>
      <Input errorIdentifier={firstNameError} labelText={t('label.firstName')}
             errorLabelText={firstNameError}
             inputId='firstName' inputType='text' inputName='firstName'
             inputOnBlur={(e) => setFirstName(e.target.value)}
             inputOnChange={(e) => setFirstName(e.target.value)} inputRequired='required' autoComplete='off'
             tooltipId={t('tooltip.header.firstName')} tooltipText={t('tooltip.name')} value={firstName}/>
    </div>;

  const lastNameCell =
    <div className='Form-Row fill-width'>
      <Input errorIdentifier={lastNameError} labelText={t('label.lastName')}
             errorLabelText={lastNameError}
             inputId='lastName' inputType='text' inputName='lastName'
             inputOnBlur={(e) => setLastName(e.target.value)}
             inputOnChange={(e) => setLastName(e.target.value)} inputRequired='required' autoComplete='off'
             tooltipId={t('tooltip.header.lastName')} tooltipText={t('tooltip.name')} value={lastName}/>
    </div>;

  const emailCell =
    <div className='Form-Row fill-width'>
      <Input errorIdentifier={emailError} labelText={t('label.email')}
             errorLabelText={emailError} inputId='email' inputType='email' inputName='email'
             inputOnBlur={(e) => setEmail(e.target.value)}
             inputOnChange={(e) => setEmail(e.target.value)}
             inputRequired='required' autoComplete='off'
             tooltipId={t('tooltip.header.email')} tooltipText={t('tooltip.email')} value={email}/>
    </div>;

  const telNumCell =
    <div className='Form-Row fill-width'>
      <Input errorIdentifier={telNumError} labelText={t('label.tel')}
             errorLabelText={telNumError} mask={masks.tel}
             selectOnChange={(event) => setTelNumPrefix(event.target.value)} selectValue={telNumPrefix}
             inputId='telNum' inputType='tel' inputName='telNum'
             inputOnBlur={(e) => setTelNum(e.target.value)}
             inputOnChange={(e) => setTelNum(e.target.value)} inputRequired='required' autoComplete='off'
             tooltipId={t('tooltip.header.telNum')} tooltipText={t('tooltip.telNumOrHouseOrFlatNum')}
             value={telNum}/>
    </div>;

  return (
    <section
      className={`Contact-Data-Page Flex A-I-C J-C-S-B F-F-C-N fill-width ${height > 710 && 'fill-height'} ${(page !== 2 && 'none')}`}>
      <header className='Flex A-I-C J-C-S-B F-F-R-N fill-width'>
        <h1 className='h3-size T-C'>{t('orderForm.contact.header')}</h1>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate={true}/>
      </header>
      <form className='Form Flex F-F-C-N J-C-S-B A-I-C fill-width'>
        {width > 768 ?
          <React.Fragment>
            <div className='Form-Row-Double Optional Without-Ruler fill-width'>
              {firstNameCell}
              {lastNameCell}
            </div>
            <div className='Form-Row-Double Optional fill-width'>
              {emailCell}
              <p className='font-weight_900 h1-size Ruler Flex J-C-C A-I-C'>
                {t('orderForm.contact.or')}
              </p>
              {telNumCell}
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch={true}
                      interval={1000000000} className='fill-width'>
              <Carousel.Item>
                <div className='Flex J-C-S-A A-I-C F-F-C-N fill-height'>
                  {firstNameCell}
                  {lastNameCell}
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className='Flex J-C-S-A A-I-C F-F-C-N fill-height'>
                  {emailCell}
                  {telNumCell}
                </div>
              </Carousel.Item>
            </Carousel>
          </React.Fragment>
        }
      </form>
      <NavigationButtons page={page} nextButtonText={t('button.submit')}
                         displayNext={true} displayPrev={false}
                         nextButtonDisabled={!firstName || !lastName || !(email || telNum)}
                         nextOnClickAction={() => sendContactData()} nextButtonAnimation={nextButtonAnimation}/>
    </section>
  );
}
