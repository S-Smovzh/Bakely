import React from 'react';
import '../overlay/Overlay.css';
import PropTypes from 'prop-types';

export const Picture = ({id, imgClassName, className, src, alt, src320, src480, src768, src991, src1199}) => {

  Picture.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  };

  Picture.defaultProps = {
    id: '',
    imgClassName: '',
    className: '',
    src: '',
    alt: '',
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
