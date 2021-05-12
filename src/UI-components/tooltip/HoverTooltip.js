import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../context/toast/ToastContext';
import curveArrow from '../../images/icons/curve-arrow.svg';
import { isTouchDevice } from '../../utils/isTouchDevice';
import './Tooltip.css';

export const HoverTooltip = () => {
  const { toast } = useContext(ToastContext);
  const [ t ] = useTranslation();

  return (
    <React.Fragment>
      {toast.hoverTipShow ? (
        <div className="Hover-Tooltip Flex J-C-C A-I-C F-F-C-N" style={{ top: toast.tipTop }}>
          <img src={curveArrow} alt="" className="Image-100-50"/>
          <p>
            {isTouchDevice() ? t('hover') : t('click')}
          </p>
        </div>
      )
        :
        null}
    </React.Fragment>
  );
};
