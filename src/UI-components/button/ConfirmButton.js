import React from 'react';
import PropTypes from 'prop-types';
import { Animation } from '../../animation/Animation';
import { Button } from './Button';

export default function ConfirmButton({ ariaLabel, className, disabled, error, onClick, text }) {
  ConfirmButton.propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  };

  ConfirmButton.defaultProps = {
    ariaLabel: '',
    className: '',
    disabled: false,
    error: false,
    onClick: null,
    text: 'Confirm'
  };

  return (
    <Animation onClick={!disabled} onHover={!disabled} type={error ? 'none' : 'rubber'}>
      <Button
        type="button"
        className={`Btn-Sm Btn-Su ${(error ? 'Error-Shake ' : ' ')} ${className}`}
        disabled={disabled}
        onClick={onClick} ariaLabel={ariaLabel}>
        {text}
      </Button>
    </Animation>
  );
}
