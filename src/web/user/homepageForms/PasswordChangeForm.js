import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
import axios from 'axios';
import ConfirmButton from '../../UI-components/button/ConfirmButton';
import { ModalContext } from '../../context/modal/ModalContext';
import { Input } from '../../UI-components/input/Input';
import { Form } from '../../UI-components/form/Form';
import errorHandler from '../../utils/errorHandler';
import { logError } from '../../error/errorHandler';
import { userLinks } from '../../utils/restLinks';

export const PasswordChangeForm = () => {
  const [ t ] = useTranslation();
  const [animatePasswordChange, setAnimatePasswordChange] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const { modal, setModal } = useContext(ModalContext);

  function passwordChange() {
    timer(50).subscribe(async () =>
      axios.post(userLinks.changePassword,
        {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, {
          headers: {
            Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
            'Refresh-Token': localStorage.getItem(btoa('refreshToken'))
              ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
            withCredentials: true
          }
        }
      ).then(async (response) => {
        const { success, errors } = response.data;

        if (!success && errors) {
          setAnimatePasswordChange(true);
          timer(400).subscribe(() => setAnimatePasswordChange(false));
          if (errors.code === 500 || errors.code === 600) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: errors.code
            });
          } else if (errors.code === 10) {
            setOldPasswordError(errorHandler(errors.code));
            setNewPasswordError(errorHandler(errors.code));
          } else {
            if (errors.oldPassword) {
              setOldPasswordError(errorHandler(errors.oldPassword));
            } else {
              setOldPasswordError('');
            }
            if (errors.newPassword) {
              setNewPasswordError(errorHandler(errors.newPassword));
            } else {
              setNewPasswordError('');
            }
          }
        } else {
          setPasswordChangeSuccess(true);
          setTimeout(() => {
            setPasswordChangeSuccess(false);
          }, 400);
          setOldPassword('');
          setNewPassword('');
          setOldPasswordError('');
          setNewPasswordError('');
        }
      }).catch((error) => logError(error))
    );
  }

  return (
    <Form success={passwordChangeSuccess}>
      <div className="Form-R Grid">
        <Input errorIdentifier={oldPasswordError}
          labelText={t('label.oldPassword')}
          errorLabelText={oldPasswordError} value={oldPassword}
          inputId="oldPassword" inputType="password" inputName="oldPassword"
          inputOnBlur={(event) => setOldPassword(event.target.value)}
          inputOnChange={(event) => setOldPassword(event.target.value)} inputRequired="required"
          autoComplete="off" tooltipId={t('tooltip.header')}
          tooltipText={t('tooltip.oldPassword')}
        />
      </div>
      <div className="Form-R Grid">
        <Input errorIdentifier={newPasswordError}
          labelText={t('label.newPassword')}
          errorLabelText={newPasswordError} value={newPassword}
          inputId="newPassword" inputType="password" inputName="newPassword"
          inputOnBlur={(event) => setNewPassword(event.target.value)}
          inputOnChange={(event) => setNewPassword(event.target.value)}
          inputRequired="required" autoComplete="off" tooltipId={t('tooltip.header')}
          tooltipText={t('tooltip.password')}
        />
      </div>
      <div className="Form-B">
        <ConfirmButton onClick={() => passwordChange()} disabled={!oldPassword || !newPassword}
          error={animatePasswordChange} className="Btn-Sm-X-W" text={t('button.submit')}
        />
      </div>
    </Form>
  );
};
