import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { timer } from 'rxjs';
import i18n from 'i18next';
import { ToastContext } from '../../../context/toast/ToastContext';
import { ToastMessage } from '../ToastMessage';
import { useTranslation } from 'react-i18next';

export const Cookie = () => {
  const { toast, setToast } = useContext(ToastContext);
  const [remove, setRemove] = useState(false);
  const [ t ] = useTranslation();

  return (
    <ToastMessage
      show={toast.showCookie}
      toastHeader={t('cookie.header')}
      toastText={(
        <React.Fragment>
          <p className="F-W">
            {t('cookie.sen.fir')}
          </p>
          <Link to={`/${i18n.language}/cookie-policy`} className="F-W">
            {t('cookie.sen.sec')}
          </Link>
          <p className="F-W">
            {t('cookie.sen.thi')}
          </p>
        </React.Fragment>
      )}
      showTime={999999}
      className={`Cookie ${remove ? 'Rem-T' : ''}`}
      onClose={() => {
        setRemove(true);
        timer(400).subscribe(() =>
          setToast({
            ...toast,
            showCookie: !toast.showCookie
          }));
        typeof window !== 'undefined' && localStorage.setItem(btoa('cookies'), btoa('false'));
      }
      }
    />
  );
};
