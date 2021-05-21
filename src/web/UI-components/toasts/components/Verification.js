import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../context/toast/ToastContext';
import '../../form/Form.css';
import { ToastMessage } from '../ToastMessage';
import { timer } from 'rxjs';

export const Verification = () => {
  const { toast, setToast } = useContext(ToastContext);
  const [ t ] = useTranslation();
  const [remove, setRemove] = useState(false);

  return (
    <ToastMessage show={toast.verified} showTime={3000}
      toastHeader={t('verification.header')}
      toastText={t('verification.text')}
      onClose={() => {
                    setRemove(true);
                    timer(400).subscribe(() => setToast(({
                        ...toast,
                        verified: false
                      }))
                    );
                  }}
      className={remove ? 'Rem-T' : ''}
    />
  );
};
