import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
import axios from 'axios';
import { ToastContext } from '../../../context/toast/ToastContext';
import { ModalContext } from '../../../context/modal/ModalContext';
import { clientConfig } from '../../../utils/restApiConfigs';
import { Animation } from '../../animation/Animation';
import errorHandler from '../../../utils/errorHandler';
import { logError } from '../../../error/errorHandler';
import { clientLinks } from '../../../utils/restLinks';
import Checkbox from '../../checkbox/Checkbox';
import { Input } from '../../input/Input';
import { Form } from '../../form/Form';
import { ToastMessage } from '../ToastMessage';
import './Subscribe.css';

export const Subscribe = () => {
  const { toast, setToast } = useContext(ToastContext);
  const { modal, setModal } = useContext(ModalContext);
  const [ t ] = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [show, setShow] = useState(true);
  const [remove, setRemove] = useState(false);

  async function performSubscription() {
    axios.post(clientLinks.subscribe, { email: email }, clientConfig)
      .then((response) => {
        const { success, errors } = response.data;

        if (!success && errors) {
          if (errors.code === 500) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: 500
            });
          } else if (errors.code === 10) {
            setEmailError(errorHandler(errors.code));
          } else if (errors.email) {
            setEmailError(errorHandler(errors.oldEmail));
          }
        } else if (success) {
          setToast({
            ...toast,
            showSubscription: false
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem(btoa('showSubscription'), btoa('false'));
          }
          setEmail('');
          setEmailError(null);
          closeModal();
        }
      }).catch((error) => logError(error));
  }

  function closeModal() {
    setToast({
      ...toast,
      showSubscription: false
    });
    if (show) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(btoa('subscriptionShow'), btoa('true'));
      }
    } else if (typeof window !== 'undefined') {
      localStorage.setItem(btoa('subscriptionShow'), btoa('false'));
    }
  }

  return (
    <ToastMessage
      show={toast.showSubscription}
      toastHeader="Subscribe to our newsletters!"
      toastText={(
        <React.Fragment>
          <Form className="Sub-F">
            <div className="Form-R Grid">
              <Input errorIdentifier={emailError} labelText={t('label.email')} errorLabelText={emailError}
                inputId="email" inputType="email" inputName="email"
                minLength={6} maxLength={254}
                inputMode="email"
                inputOnBlur={(event) => setEmail(event.target.value)}
                inputOnChange={(event) => setEmail(event.target.value)} inputRequired="required"
                autoComplete="on"
                tooltipId={t('label.header.email')} tooltipText={t('tooltip.email')} value={email}
              />
            </div>
            <div className="Form-Checkbox Flex J-C-S-B A-I-C F-W ">
              <label className="h5-size">
                Do not show again:
              </label>
              <Checkbox onClick={() => setShow(!show)}/>
            </div>
          </Form>
          <Animation type="bounce" onHover onClick
            infinite={false}>
            <button className="Btn Btn-Su Btn-Sm-X-W" type="button" onClick={() => {
              performSubscription();
            }}>
              Subscribe
            </button>
          </Animation>
        </React.Fragment>
      )}
      className={remove ? 'Rem-T' : ''}
      onClose={() => {
        setRemove(true);
        timer(400).subscribe(() =>
          closeModal()
        );
      }}
    />
  );
};
