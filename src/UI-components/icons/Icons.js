import React from "react";

export {PrevIcon, NextIcon};

const PrevIcon = ({ariaLabel}) => {
  return (
    <span className='button-secondary button-icon' aria-label={ariaLabel}>
      <img src='http://localhost:3000/img/icons/arrow-left_black.svg' alt='' className='icon'/>
    </span>
  );
};

const NextIcon = ({ariaLabel}) => {
  return (
    <span className='button-secondary button-icon' aria-label={ariaLabel}>
      <img src='http://localhost:3000/img/icons/arrow-right_black.svg' alt='' className='icon'/>
    </span>
  );
};
