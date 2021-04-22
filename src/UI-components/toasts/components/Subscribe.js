import React, {useContext, useState} from 'react';
import {Input} from '../../input/Input';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import errorHandler from '../../../utils/errorHandler';
import '../../form/Form.css';
import {Form} from "../../form/Form";
import {ToastContext} from "../../../context/toast/ToastContext";
import {ModalContext} from "../../../context/modal/ModalContext";
import {ToastMessage} from "../Toast";
import Checkbox from "../../checkbox/Checkbox";
import './Subscribe.css';
import {Animation} from "../../../animation/Animation";
import {clientLinks} from "../../../utils/restLinks";
import {clientConfig} from "../../../utils/restApiConfigs";
import {logError} from "../../../error/errorHandler";

export const Subscribe = () => {
  const {toast, setToast} = useContext(ToastContext);
  const {modal, setModal} = useContext(ModalContext);
  const [t] = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [show, setShow] = useState(true);

  async function performSubscription() {
    axios.post(clientLinks.subscribe, {email: email}, clientConfig)
      .then((response) => {
        const {success, errors} = response.data;
        if (!success && errors) {
          if (errors.code === 500) {
            setModal({
              ...modal,
              internalError: true,
              errorCode: 500
            });
          } else if (errors.code === 10) {
            setEmailError(errorHandler(errors.code));
          } else {
            if (errors.email) {
              setEmailError(errorHandler(errors.oldEmail));
            }
          }
        } else if (success) {
          setToast({
            ...toast,
            showSubscription: false
          });
          localStorage.setItem('showSubscription', btoa('false'));
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
      localStorage.setItem('subscriptionShow', btoa('true'));
    } else {
      localStorage.setItem('subscriptionShow', btoa('false'));
    }
  }

  return (
    <ToastMessage show={toast.showSubscription}
                  toastHeader='Subscribe to our newsletters!'
                  toastText={
                    <React.Fragment>
                      <Form>
                        <div className='Form-Row Grid'>
                          <Input errorIdentifier={emailError} labelText={t('label.email')} errorLabelText={emailError}
                                 inputId='email' inputType='email' inputName='email' minLength={6} maxLength={254}
                                 inputMode='email'
                                 inputOnBlur={(event) => setEmail(event.target.value)}
                                 inputOnChange={(event) => setEmail(event.target.value)} inputRequired='required'
                                 autoComplete='on'
                                 tooltipId={t('label.header.email')} tooltipText={t('tooltip.email')} value={email}/>
                        </div>
                        <div className='Form-Checkbox Flex J-C-S-B A-I-C fill-width '>
                          <label htmlFor='doNotShow' className='h5-size'>
                            Do not show again:
                          </label>
                          <Checkbox onClick={() => setShow(!show)}/>
                        </div>
                      </Form>
                      <Animation type='bounce' onHover={true} onClick={true} infinite={false}>
                        <button className='button button-success Button-X-Small-Wide' type='button' onClick={() => {
                          performSubscription();
                        }}>
                          Subscribe
                        </button>
                      </Animation>
                    </React.Fragment>
                  }
                  onClose={
                    () => closeModal()
                  }
    />
  );
};
