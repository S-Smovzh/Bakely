import React, {useContext} from 'react';
import '../../form/Form.css';
import {ToastContext} from "../../../context/toast/ToastContext";
import {ToastMessage} from "../Toast";
import {useTranslation} from "react-i18next";

export const Verification = () => {
  const {toast, setToast} = useContext(ToastContext);
  const [t] = useTranslation();

  return (
    <ToastMessage show={toast.verified} showTime={3000}
                  toastHeader={t('verification.header')}
                  toastText={t('verification.text')}
                  onClose={() => setToast(({
                    ...toast,
                    verified: false
                  }))}
    />
  );
};
//TODO 'Successful Verification' 'Your account was successfully verified! Now you can log in.'