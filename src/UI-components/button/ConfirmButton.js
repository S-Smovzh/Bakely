import React from "react";
import PropTypes from 'prop-types';
import {Animation} from "../../animation/Animation";

export default function ConfirmButton({ariaLabel, className, disabled, error, onClick, text}) {

  ConfirmButton.propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  ConfirmButton.defaultProps = {
    ariaLabel: '',
    className: '',
    disabled: false,
    error: false,
    onClick: null,
    text: 'Confirm'
  }

  return (
    <Animation onClick={!disabled} onHover={!disabled} type={error ? 'none' : 'rubber'}>
      <button
        type='button'
        className={'button button-small button-success ' + (error ? 'Error-Shake ' : ' ') + className}
        disabled={disabled}
        onClick={onClick} aria-label={ariaLabel}>
        {text}
      </button>
    </Animation>
  );
}