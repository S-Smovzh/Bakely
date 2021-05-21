import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ className, success, children }) => {
  Form.propTypes = {
    className: PropTypes.string,
    success: PropTypes.bool,
    children: PropTypes.any
  };

  Form.defaultProps = {
    className: '',
    success: false,
    children: null
  };
  return (
    <form className={`Form F-W ${className ? className : 'Grid'}`} method="POST">
      {success ? (
        <div className="SVG-С Flex J-C-C A-I-C F-W F-H">
          <svg version="1.1" className="Su-T" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 37 37"
            xmlSpace="preserve" enableBackground="new 0 0 37 37">
            <path className="Su-T__C"
              d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,
              6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
            />
            <polyline className="Su-T__Ch" points="11.6,20 15.9,24.2 26.4,13.8"/>
          </svg>
        </div>
      )
        : null}
      {children}
    </form>
  );
};
