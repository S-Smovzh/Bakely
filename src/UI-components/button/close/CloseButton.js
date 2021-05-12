import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Animation } from '../../../animation/Animation';
import cross from '../../../images/icons/cross.svg';
import { Button } from '../Button';
import './CloseButton.css';

export default function CloseButton({ animate, onClick, ariaLabel }) {
  const [ t ] = useTranslation();

  CloseButton.propTypes = {
    animate: PropTypes.bool.isRequired,
    ariaLabel: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  CloseButton.defaultProps = {
    animate: true,
    onClick: null,
    ariaLabel: t('button.close')
  };

  return (
    <Animation infinite={false} onHover={animate} onClick={animate}
      type="skew">
      <Button ariaLabel={ariaLabel} onClick={onClick} type="button"
        className="Btn-E Btn-C">
        <img src={cross} alt=""/>
      </Button>
    </Animation>
  );
}
