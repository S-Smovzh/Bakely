import React, {useEffect, useRef} from "react";
import './LoadingOverlay.css';

export const LoadingOverlay = ({active, text, children}) => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    if (!active && spinnerRef.current) {
      setTimeout(() => spinnerRef.current && spinnerRef.current.remove(), 800);
    }
  }, [active])

  return (
    <div className='Loading-Overlay-Container fill-width fill-height'>
      <div className={'Spinner fill-width fill-height ' + (active ? 'showOverlay ' : 'hideOverlay ')} ref={spinnerRef}>
        <svg className="spinner">
          <circle cx="43" cy="43" r="38"/>
        </svg>
        {text}
      </div>
      {children}
    </div>
  )
}