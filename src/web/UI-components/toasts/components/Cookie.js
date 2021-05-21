import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { timer } from 'rxjs';
import i18n from 'i18next';
import { ToastContext } from '../../../context/toast/ToastContext';
import { ToastMessage } from '../ToastMessage';

export const Cookie = () => {
  const { toast, setToast } = useContext(ToastContext);
  const [remove, setRemove] = useState(false);

  return (
    <ToastMessage
      show={toast.showCookie}
      toastHeader="Cookies"
      toastText={(
        <React.Fragment>
          <p className="F-W">
            This website uses cookie in order to offer the most relevant information and
            optimal performance.
          </p>
          <Link to={`/${i18n.language}/cookie-policy`} className="F-W">
            For full details read our cookie policy.
          </Link>
          <p className="F-W">
            *By continuing using this site you accept cookie.
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
