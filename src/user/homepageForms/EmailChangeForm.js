import React, {useContext, useState} from "react";
import {Form} from "../../UI-components/form/Form";
import {Input} from "../../UI-components/input/Input";
import ConfirmButton from "../../UI-components/button/ConfirmButton";
import axios from "axios";
import {userLinks} from "../../utils/restLinks";
import {userConfig} from "../../utils/restApiConfigs";
import errorHandler from "../../utils/errorHandler";
import {logError} from "../../error/errorHandler";
import {timer} from "rxjs";
import {ModalContext} from "../../context/modal/ModalContext";
import {useTranslation} from "react-i18next";

export const EmailChangeForm = () => {
  const {modal, setModal} = useContext(ModalContext);

  const [t] = useTranslation();
  const [animateEmailChange, setAnimateEmailChange] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldEmailError, setOldEmailError] = useState('');
  const [newEmailError, setNewEmailError] = useState('');

  function emailChange() {
    axios.post(userLinks.changeEmail,
      {
        oldEmail: oldEmail,
        newEmail: newEmail
      }, userConfig
    ).then((response) => {
      const {success, errors} = response.data;
      if (!success && errors) {
        setAnimateEmailChange(true);
        timer(400).subscribe(() => setAnimateEmailChange(false));
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
            setOldEmailError('');
          }
          if (errors.newEmail) {
            setNewEmailError(errorHandler(errors.newEmail));
          } else {
            setNewEmailError('');
          }
        }
      } else {
        setEmailChangeSuccess(true);
        setTimeout(() => {
          setEmailChangeSuccess(false);
        }, 400)
        setOldEmail('');
        setNewEmail('');
        setOldEmailError('');
        setNewEmailError('');
      }
    }).catch((error) => logError(error));
  }

  return(
    <Form success={emailChangeSuccess}>
      <div className='Form-Row'>
        <Input errorIdentifier={oldEmailError} labelText={t('label.oldEmail')}
               errorLabelText={oldEmailError} value={oldEmail}
               inputId='oldEmail' inputType='email' inputName='oldEmail'
               inputOnBlur={(event) => setOldEmail(event.target.value)}
               inputOnChange={(event) => setOldEmail(event.target.value)} inputRequired='required'
               autoComplete='off' tooltipId={t('tooltip.header.oldEmail')} tooltipText={t('tooltip.oldEmail')}/>
      </div>
      <div className='Form-Row'>
        <Input errorIdentifier={newEmailError} labelText={t('label.newEmail')}
               errorLabelText={newEmailError} value={newEmail}
               inputId='newEmail' inputType='email' inputName='newEmail'
               inputOnBlur={(event) => setNewEmail(event.target.value)}
               inputOnChange={(event) => setNewEmail(event.target.value)}
               inputRequired='required' autoComplete='off' tooltipId={t('tooltip.header.email')}
               tooltipText={t('tooltip.email')}/>
      </div>
      <div className='Form-Button'>
        <ConfirmButton onClick={() => emailChange()} disabled={!oldEmail || !newEmail}
                       animate={animateEmailChange} className='button-small-x-wide' text={t('button.submit')}/>
      </div>
    </Form>
  );
}
