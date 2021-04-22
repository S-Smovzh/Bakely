import React, {useContext} from 'react';
import './Tooltip.css';
import {ToastContext} from "../../context/toast/ToastContext";
import {useTranslation} from "react-i18next";
import {isTouchDevice} from "../../utils/isTouchDevice";

export const HoverTooltip = () => {
  const {toast} = useContext(ToastContext);
  const [t] = useTranslation();

  return (
    <React.Fragment>
      {toast.hoverTipShow ?
        <div className='Hover-Tooltip Flex J-C-C A-I-C F-F-C-N' style={{top: toast.tipTop}}>
          <img src='http://localhost:3000/img/icons/curve-arrow.svg' alt='' className='Image-100-50'/>
          <p>
            {isTouchDevice() ?
              t('hover')
              : t('click')
            }
          </p>
        </div>
        :
        null}
    </React.Fragment>);
};
