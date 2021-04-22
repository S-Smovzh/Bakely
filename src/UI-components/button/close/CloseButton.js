import React from "react";
import PropTypes from 'prop-types';
import {Animation} from "../../../animation/Animation";
import './CloseButton.css';
import {Button} from "../Button";

export default function CloseButton({animate, onClick, ariaLabel}) {

  CloseButton.propTypes = {
    animate: PropTypes.bool.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  CloseButton.defaultProps = {
    animate: true,
    onClick: null,
    ariaLabel: ''
  }

  return (
    <Animation infinite={false} onHover={animate} onClick={animate} type='skew'>
      <Button ariaLabel={ariaLabel} onClick={onClick} type='button' className='button-error Button__Close'>
        <img src='http://localhost:3000/img/icons/cross.svg' alt=''/>
      </Button>
    </Animation>
  );
}