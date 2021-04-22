import React, {useContext, useEffect, useState} from 'react'
import './NotificationButton.css';
import {NotificationOverlayContext} from "../../../context/notification-overlay/NavbarMenuContext";
import {ToastContext} from "../../../context/toast/ToastContext";
import {timer} from "rxjs";
import {Button} from "../Button";
import {useTranslation} from "react-i18next";

export default function NotificationButton({children}) {
  const {overlay, setOverlay} = useContext(NotificationOverlayContext);
  const {toast} = useContext(ToastContext);
  const [toastsCount, setToastsCount] = useState(0);
  const [show, setShow] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    const toastsMap = new Map([]);
    if (toast.showCookie) {
      toastsMap.set('cookie', true);
    } else {
      toastsMap.delete('cookie');
    }
    if (toast.showSubscription && !toast.showCookie) {
      toastsMap.set('subscribe', true);
    } else {
      toastsMap.delete('subscribe');
    }
    if (toast.verified) {
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
  }, [toast]);

  useEffect(() => {
    if (toastsCount > 0) {
      setAnimationActive(true);
      timer(600).subscribe(() => setAnimationActive(false));
    }
  }, [toastsCount])

  return (
    <React.Fragment>
      {show ?
        <React.Fragment>
          <Button className="button-icon Button-Notification" ariaLabel={t('button.notification')}
                  onClick={() => setOverlay({show: overlay.show === 2 ? true : !overlay.show})}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 459.334 459.334" xmlSpace="preserve"
                 className={'icon Bell ' + (animationActive ? 'BellRing' : '')}>
              <path d="M175.216,404.514c-0.001,0.12-0.009,0.239-0.009,0.359c0,30.078,24.383,54.461,54.461,54.461
				s54.461-24.383,54.461-54.461c0-0.12-0.008-0.239-0.009-0.359H175.216z"/>
              <path d="M403.549,336.438l-49.015-72.002c0-22.041,0-75.898,0-89.83c0-60.581-43.144-111.079-100.381-122.459V24.485
				C254.152,10.963,243.19,0,229.667,0s-24.485,10.963-24.485,24.485v27.663c-57.237,11.381-100.381,61.879-100.381,122.459
				c0,23.716,0,76.084,0,89.83l-49.015,72.002c-5.163,7.584-5.709,17.401-1.419,25.511c4.29,8.11,12.712,13.182,21.887,13.182
				H383.08c9.175,0,17.597-5.073,21.887-13.182C409.258,353.839,408.711,344.022,403.549,336.438z"/>
            </svg>
            <div className='Notification-Count'>
              {toastsCount}
            </div>
          </Button>
          <div
            className={`Overlay Flex J-C-C A-I-C F-F-C-N ${(overlay.show !== 2 && (overlay.show ? 'Toast-Stack-Reveal' : 'Toast-Stack-Disappear'))}`}>
            {children}
          </div>
        </React.Fragment>
        : null}
    </React.Fragment>
  )
}