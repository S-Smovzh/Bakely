import React from "react";
import PropTypes from 'prop-types';
import {Animation} from "../../../animation/Animation";
import './CloseButton.css';

export default function CloseButton({animate, onClick, ariaLabel}) {

  CloseButton.propTypes = {
    animate: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    ariaLabel: PropTypes.string.isRequired
  }

  CloseButton.defaultProps = {
    animate: true,
    onClick: null,
    ariaLabel: ''
  }

  return (
    <Animation infinite={false} onHover={animate} onClick={animate} type='skew'>
      <button onClick={onClick} type='button' className='button-error Button__Close'
              aria-label={ariaLabel}>
        <img src='http://localhost:3000/img/icons/cross.svg' alt=''/>
      </button>
    </Animation>
  );
}