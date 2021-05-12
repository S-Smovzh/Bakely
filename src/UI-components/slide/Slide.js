import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useWindowDimensions from '../../utils/isTouchDevice';
import './Slide.css';

export default function Slide({
  description,
  descriptionClass,
  imgSrc,
  link,
  linkClass,
  linkText,
  title,
  titleClass
}) {
  Slide.propTypes = {
    description: PropTypes.string.isRequired,
    descriptionClass: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkClass: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleClass: PropTypes.string.isRequired
  };

  Slide.defaultProps = {
    description: '',
    descriptionClass: '',
    imgSrc: '',
    link: '',
    linkClass: '',
    linkText: '',
    title: '',
    titleClass: ''
  };

  const { width } = useWindowDimensions();

  return (
    <div className="Slide Grid" style={{ backgroundImage: `url('${imgSrc}')` }}>
      <div className="Slide-C Flex J-C-F-S A-I-C F-F-C-N T-C F-W">
        <h1 className={'Slide-T T-C Playfair h2-size ' + titleClass}>
          {title}
        </h1>
        <p className={`'Slide-D T-C font-weight_400 Nunito
        ${width > 481 ? 'h4-size' : 'h6-size'}
        ${descriptionClass}`}>
          {description}
        </p>
      </div>
      <div className="Btn-Cont Flex J-C-C A-I-C">
        <Link to={link} className={`Nunito T-C h4-size ${linkClass}`}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}
