import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import { timer } from 'rxjs';
import axios from 'axios';
import CloseButton from '../UI-components/button/close/CloseButton';
import { NextIcon, PrevIcon } from '../UI-components/icons/Icons';
import { ModalContext } from '../context/modal/ModalContext';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Input } from '../UI-components/input/Input';
import errorHandler from '../utils/errorHandler';
import { logError } from '../error/errorHandler';
import { clientLinks } from '../utils/restLinks';
import { NavigationButtons } from './OrderForm';
import { masks } from '../utils/inputMasks';

// eslint-disable-next-line react/prop-types
export const ContactDataPage = ({ closeModal, next, page }) => {
  const [ t ] = useTranslation();
  const [nextButtonAnimation, setNextButtonAnimation] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telNum, setTelNum] = useState('');
  const [telNumPrefix, setTelNumPrefix] = useState('+38');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telNumError, setTelNumError] = useState('');

  const { modal, setModal } = useContext(ModalContext);
  const { width, height } = useWindowDimensions();

  function sendContactData() {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      telNum: telNum
    };

    axios.post(clientLinks.order, data, {
      headers: {
        'Client-Token': localStorage.getItem(btoa('clientsToken'))
          ? atob(localStorage.getItem(btoa('clientsToken'))) : null,
        withCredentials: true
      }
    })
      .then((response) => {
        const { success, errors } = response.data;

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
          // eslint-disable-next-line callback-return
          next();
        }
      })
      .catch((error) => logError(error));
  }

  const firstNameCell = (
    <div className="Form-R Grid F-W">
      <Input errorIdentifier={firstNameError} labelText={t('label.firstName')}
        errorLabelText={firstNameError}
        inputId="firstName" inputType="text" inputName="firstName"
        inputOnBlur={(e) => setFirstName(e.target.value)}
        inputOnChange={(e) => setFirstName(e.target.value)} inputRequired="required" autoComplete="off"
        tooltipId={t('tooltip.header')} tooltipText={t('tooltip.name')} value={firstName}
      />
    </div>
  );

  const lastNameCell = (
    <div className="Form-R Grid F-W">
      <Input errorIdentifier={lastNameError} labelText={t('label.lastName')}
        errorLabelText={lastNameError}
        inputId="lastName" inputType="text" inputName="lastName"
        inputOnBlur={(e) => setLastName(e.target.value)}
        inputOnChange={(e) => setLastName(e.target.value)} inputRequired="required" autoComplete="off"
        tooltipId={t('tooltip.header')} tooltipText={t('tooltip.name')} value={lastName}
      />
    </div>
  );

  const emailCell = (
    <div className="Form-R Grid F-W">
      <Input errorIdentifier={emailError} labelText={t('label.email')}
        errorLabelText={emailError} inputId="email" inputType="email"
        inputName="email"
        inputOnBlur={(e) => setEmail(e.target.value)}
        inputOnChange={(e) => setEmail(e.target.value)}
        inputRequired="required" autoComplete="off"
        tooltipId={t('tooltip.header')} tooltipText={t('tooltip.email')} value={email}
      />
    </div>
  );

  const telNumCell = (
    <div className="Form-R Grid F-W">
      <Input errorIdentifier={telNumError} labelText={t('label.tel')}
        errorLabelText={telNumError} mask={masks.tel} telNumPrefix={telNumPrefix}
        selectOnChange={(eventKey) => setTelNumPrefix(eventKey)} selectValue={telNumPrefix}
        inputId="telNum" inputType="tel" inputName="telNum"
        inputOnBlur={(e) => setTelNum(e.target.value)}
        inputOnChange={(e) => setTelNum(e.target.value)} inputRequired="required" autoComplete="off"
        tooltipId={t('tooltip.header')} tooltipText={t('tooltip.telNumOrHouseOrFlatNum')}
        value={telNum}
      />
    </div>
  );

  return (
    <section
      className={`Contact-Data-Page Flex A-I-C J-C-S-B F-F-C-N F-W 
      ${height > 710 ? 'F-H' : ''} 
      ${(page !== 2 ? 'None' : '')}`}>
      <header className="Flex A-I-C J-C-S-B F-F-R-N F-W">
        <h1 className="h3-size T-C">{t('orderForm.contact.header')}</h1>
        <CloseButton onClick={closeModal} ariaLabel={t('ariaLabel.close')} animate/>
      </header>
      <form className="Form Flex F-F-C-N J-C-S-B A-I-C F-W">
        {width > 768 ? (
          <React.Fragment>
            <div className="Form-R-D Optional Wout-R F-W">
              {firstNameCell}
              {lastNameCell}
            </div>
            <div className="Form-R-D Optional F-W">
              {emailCell}
              <p className="font-weight_900 h1-size Ruler Flex J-C-C A-I-C">
                {t('orderForm.contact.or')}
              </p>
              {telNumCell}
            </div>
          </React.Fragment>
        )
          : (
            <React.Fragment>
              <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch
                interval={1000000000} className="F-W">
                <Carousel.Item>
                  <div className="Flex J-C-S-A A-I-C F-F-C-N F-H">
                    {firstNameCell}
                    {lastNameCell}
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="Flex J-C-S-A A-I-C F-F-C-N F-H">
                    {emailCell}
                    {telNumCell}
                  </div>
                </Carousel.Item>
              </Carousel>
            </React.Fragment>
          )}
      </form>
      <NavigationButtons page={page} nextButtonText={t('button.submit')}
        displayNext displayPrev={false}
        nextButtonDisabled={!firstName || !lastName || !(email || telNum)}
        nextOnClickAction={() => sendContactData()} nextButtonAnimation={nextButtonAnimation}
      />
    </section>
  );
};
