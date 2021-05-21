import React from 'react';
import PropTypes from 'prop-types';
import arrowL from '../../../assets/images/icons/arrow-left_black.svg';
import arrowR from '../../../assets/images/icons/arrow-right_black.svg';

function PrevIcon({ ariaLabel }) {
  PrevIcon.propTypes = {
    ariaLabel: PropTypes.string
  };

  PrevIcon.defaultProps = {
    ariaLabel: ''
  };

  return (
    <span className="Btn-S Btn-I" aria-label={ariaLabel}>
      <img src={arrowL} alt="" className="Icon"/>
    </span>
  );
}

function NextIcon({ ariaLabel }) {
  NextIcon.propTypes = {
    ariaLabel: PropTypes.string
  };

  NextIcon.defaultProps = {
    ariaLabel: ''
  };

  return (
    <span className="Btn-S Btn-I" aria-label={ariaLabel}>
      <img src={arrowR} alt="" className="Icon"/>
    </span>
  );
}

export { PrevIcon, NextIcon };
