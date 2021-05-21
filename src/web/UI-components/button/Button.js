import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export const Button = ({ ariaLabel, buttonRef, className, disabled, name, onClick, tabIndex, type, children }) => {
  Button.propTypes = {
    ariaLabel: PropTypes.string,
    buttonRef: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    tabIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    type: PropTypes.string,
    children: PropTypes.any
  };

  Button.defaultProps = {
    ariaLabel: '',
    buttonRef: null,
    className: '',
    disabled: false,
    name: '',
    onClick: null,
    tabIndex: '',
    type: 'button'
  };

  return (
    <button aria-label={ariaLabel} className={`Btn Flex J-C-C A-I-C T-C ${className}`} disabled={disabled}
      name={name} onClick={onClick} ref={buttonRef}
      type={type} tabIndex={tabIndex}>
      {children}
    </button>
  );
};
