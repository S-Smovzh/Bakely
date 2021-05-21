import React, { useEffect, useRef } from 'react';
import './LoadingOverlay.css';
import PropTypes from 'prop-types';

export const LoadingOverlay = ({ active, text, children }) => {
  LoadingOverlay.propTypes = {
    active: PropTypes.bool,
    text: PropTypes.string,
    children: PropTypes.any
  };

  LoadingOverlay.defaultProps = {
    active: '',
    text: null,
    children: null
  };
  const spinnerRef = useRef(null);

  useEffect(() => {
    if (!active && spinnerRef.current) {
      setTimeout(() => spinnerRef.current && spinnerRef.current.remove(), 800);
    }
  }, [ active ]);

  return (
    <div className="Load-Ov-C F-W F-H">
      <div className={`Sp Flex J-C-C A-I-C F-F-C-N T-C F-W F-H ${active ? 'Ov-Show ' : 'Ov-Hide '}`} ref={spinnerRef}>
        <svg className="sp">
          <circle cx="43" cy="43" r="38"/>
        </svg>
        {text}
      </div>
      {children}
    </div>
  );
};
