import React from 'react';
import '../overlay/Overlay.css';
import PropTypes from 'prop-types';

export const Picture = ({alt, className, id, imgClassName, src, src320, src480, src768, src991, src1199}) => {

  Picture.propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    imgClassName: PropTypes.string,
    src: PropTypes.string.isRequired,
    src320: PropTypes.string,
    src480: PropTypes.string,
    src768: PropTypes.string,
    src991: PropTypes.string,
    src1199: PropTypes.string
  };

  Picture.defaultProps = {
    alt: '',
    id: '',
    imgClassName: '',
    className: '',
    src: '',
    src320: '',
    src480: '',
    src768: '',
    src991: '',
    src1199: ''
  }

  return (
    <picture id={id} className={className}>
      <source srcSet={src} media="(min-width: 1200px)"/>
      <source srcSet={src1199} media="(min-width: 992px) and (max-width: 1199px)"/>
      <source srcSet={src991} media="(min-width: 768px) and (max-width: 991px)"/>
      <source srcSet={src768} media="(max-width: 768px)"/>
      <source srcSet={src480} media="(max-width: 480px)"/>
      <source srcSet={src320} media="(max-width: 320px)"/>

      <img src={src} alt={alt} className={imgClassName}/>
    </picture>
  );
};
