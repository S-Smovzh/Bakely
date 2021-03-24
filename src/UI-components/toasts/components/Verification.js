import React, {useContext} from 'react';
import '../../form/Form.css';
import {ToastContext} from "../../../context/toast/ToastContext";
import {ToastMessage} from "../Toast";

export const Verification = () => {
  const {toast, setToast} = useContext(ToastContext);

  return (
    <ToastMessage show={toast.verified} toastType='withTimer' showTime={3000}
                  toastHeader='Successful Verification'
                  toastText='Your account was successfully verified! Now you can log in.'
                  onClose={() => setToast(({
                    ...toast,
                    verified: false
                  }))}/>
  );
};
