import React, {useContext} from 'react';
import '../../form/Form.css';
import {ToastContext} from "../../../context/toast/ToastContext";
import {ToastMessage} from "../Toast";
import {Link} from "react-router-dom";

export const Cookie = () => {
  const {toast, setToast} = useContext(ToastContext);

  return (
    <ToastMessage show={toast.showCookie} toastType='eternal' toastHeader='Cookies'
                  toastText={
                    <React.Fragment>
                      <p className='fill-width'>
                        This website uses cookie in order to offer the most relevant information and
                        optimal
                        performance.
                      </p>
                      <Link to='/cookie-policy' className='fill-width'>
                        For full details read our cookie policy.
                      </Link>
                      <p className='fill-width'>
                        * By continuing using this site you accept cookie.
                      </p>
                    </React.Fragment>
                  } showTime={999999} className='Cookie'
                  onClose={() => {
                    setToast({
                      ...toast,
                      showCookie: !toast.showCookie
                    });
                    localStorage.setItem('cookies', btoa('false'));
                  }
                  }/>
  );
};
