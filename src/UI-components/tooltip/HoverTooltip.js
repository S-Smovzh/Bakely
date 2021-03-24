import React, {useContext} from 'react';
import {Picture} from '../picture/Picture';
import './Tooltip.css';
import {ToastContext} from "../../context/toast/ToastContext";

export const HoverTooltip = () => {
  const {toast} = useContext(ToastContext);

  return (
    <React.Fragment>
      {toast.hoverTipShow ?
        <div className='Hover-Tooltip' style={{top: toast.tipTop}}>
          <Picture src='http://localhost:3000/img/icons/curve-arrow.svg' alt='' className='Image-100-50'
                   imgClassName='Image-100-50'/>
          <p>
            Hover it
          </p>
        </div>
        :
        null}
    </React.Fragment>);
};
