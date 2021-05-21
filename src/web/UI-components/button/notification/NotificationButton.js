import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timer } from 'rxjs';
import { NotificationOverlayContext } from '../../../context/notification-overlay/NavbarMenuContext';
import { ToastContext } from '../../../context/toast/ToastContext';
import { Button } from '../Button';
import './NotificationButton.css';

// eslint-disable-next-line react/prop-types
export default function NotificationButton({ children }) {
  const [animationActive, setAnimationActive] = useState(false);
  const [toastsCount, setToastsCount] = useState(0);
  const [show, setShow] = useState(false);
  const [ t ] = useTranslation();
  const { overlay, setOverlay } = useContext(NotificationOverlayContext);
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    const toastsMap = new Map([]);

    if (toastContext.showCookie) {
      toastsMap.set('cookie', true);
    } else {
      toastsMap.delete('cookie');
    }
    if (toastContext.showSubscription && !toastContext.showCookie) {
      toastsMap.set('subscribe', true);
    } else {
      toastsMap.delete('subscribe');
    }
    if (toastContext.verified) {
      toastsMap.set('verified', true);
    } else {
      toastsMap.delete('verified');
    }
    setToastsCount(Array.from(toastsMap).filter(Boolean).length);

    if (Array.from(toastsMap).filter(Boolean).length === 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [ toastContext ]);

  useEffect(() => {
    if (toastsCount > 0) {
      setAnimationActive(true);
      timer(600).subscribe(() => setAnimationActive(false));
    }
  }, [ toastsCount ]);

  return (
    <React.Fragment>
      {show ? (
        <React.Fragment>
          <Button className="Btn-I Btn-N" ariaLabel={t('button.notification')}
            onClick={() => setOverlay({ show: overlay.show === 2 ? true : !overlay.show })}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="https://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 459.334 459.334" xmlSpace="preserve"
              className={`Icon Bell ${(animationActive ? 'BellRing' : '')}`}>
              <path d="M175.216,404.514c-0.001,0.12-0.009,0.239-0.009,0.359c0,30.078,24.383,54.461,54.461,54.461
				s54.461-24.383,54.461-54.461c0-0.12-0.008-0.239-0.009-0.359H175.216z"
              />
              <path d="M403.549,336.438l-49.015-72.002c0-22.041,
                0-75.898,0-89.83c0-60.581-43.144-111.079-100.381-122.459V24.485
				C254.152,10.963,243.19,0,229.667,0s-24.485,10.963-24.485,
				24.485v27.663c-57.237,11.381-100.381,61.879-100.381,122.459c0,23.716,0,76.084,
				0,89.83l-49.015,72.002c-5.163,7.584-5.709,17.401-1.419,25.511c4.29,8.11,12.712,13.182,21.887,13.182
				H383.08c9.175,0,17.597-5.073,21.887-13.182C409.258,353.839,408.711,344.022,403.549,336.438z"
              />
            </svg>
            <div className="N-C Flex J-C-C A-I-C">
              <span>{toastsCount}</span>
            </div>
          </Button>
          <div className={`Ov Flex J-C-C A-I-C F-F-C-N 
          ${(overlay.show !== 2 && (overlay.show
              ? 'Toast-Stack-Reveal'
              : 'Toast-Stack-Disappear'))}`}>
            {children}
          </div>
        </React.Fragment>
        )
        : null}
    </React.Fragment>
  );
}
