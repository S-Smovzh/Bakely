import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CloudinaryImage } from '../image/CloudinaryImage';
import useWindowDimensions from '../../utils/isTouchDevice';
import { imageClasses } from '../../utils/imagesClasses';
import { Animation } from '../animation/Animation';
import './Overlay.css';

export const Overlay = ({
  id,
  src,
  alt,
  imgClassName,
  imageType,
  type,
  text,
  link,
  onClick,
  linkClassName,
  buttonClassName,
  pictureRef,
  children,
  animationType,
  cldI,
  folders,
  imageName
}) => {
  Overlay.propTypes = {
    id: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    imgClassName: PropTypes.string,
    imageType: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
    linkClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    pictureRef: PropTypes.any,
    animationType: PropTypes.string,
    cldI: PropTypes.bool,
    folders: PropTypes.string,
    imageName: PropTypes.string,
    children: PropTypes.any
  };

  Overlay.defaultProps = {
    id: '',
    src: '',
    alt: '',
    imageType: 'listImage',
    type: 'button',
    text: '',
    link: '',
    onClick: undefined,
    linkClassName: '',
    buttonClassName: '',
    pictureRef: undefined,
    cldI: false,
    folders: '',
    imageName: '',
    animationType: 'none'
  };

  const [className, setClassName] = useState('');
  const [imHeight, setImHeight] = useState(null);
  const [imWidth, setImWidth] = useState(null);

  const ref = useRef();
  const { width } = useWindowDimensions();

  let component;

  useEffect(() => {
    if (width > 0) {
      switch (imageType) {
        case 'listImage':
          setClassName('Image-L');
          setImHeight(imageClasses.listImage(width).height);
          setImWidth(imageClasses.listImage(width).width);
          break;
        case 'similarProduct':
          setClassName('Image-S-P');
          setImHeight(imageClasses.similarProduct(width).height);
          setImWidth(imageClasses.similarProduct(width).width);
          break;
        case 'none':
          setClassName('');
          break;
        case 'main.vertical':
          setImHeight(imageClasses.main.vertical(width).height);
          setImWidth(imageClasses.main.vertical(width).width);
          setClassName('');
          break;
        case 'main.horizontal':
          setImHeight(imageClasses.main.horizontal(width).height);
          setImWidth(imageClasses.main.horizontal(width).width);
          setClassName('');
          break;
        default:
          setClassName('Image-L');
          break;
      }
    }
  }, [ width ]);

  function onFocus() {
    if (ref && ref.current) {
      ref.current.addEventListener('focus', ref.current.classList.add('Opacity-1'));
    }
  }

  function onFocusOut() {
    if (ref && ref.current) {
      ref.current.addEventListener('focusout', ref.current.classList.remove('Opacity-1'));
    }
  }

  if (type === 'link') {
    component = (
      <Animation onHover onClick type={animationType}>
        <Link to={link} className={linkClassName} onFocus={() => onFocus()}
          onBlur={() => onFocusOut()}>
          {text}
        </Link>
      </Animation>
    );
  } else if (type === 'button') {
    component = (
      <Animation onHover onClick type={animationType}>
        <button onClick={onClick} className={buttonClassName} onFocus={() => onFocus()}
          onBlur={() => onFocusOut()}>
          {text}
        </button>
      </Animation>
    );
  } else if (type === 'text') {
    component = <p>{text}</p>;
  } else {
    component =
      component = <p>{text}</p>;
  }

  return (
    // eslint-disable-next-line max-len
    <div className={`Ov-C ${(imgClassName === 'main.vertical' || imgClassName === 'main.horizontal') ? 'F-H' : ''} ${className} ${imgClassName ? imgClassName : ''} ${width < 769 ? 'N-P' : ' '}`}
      ref={pictureRef && pictureRef} id={id ? id : null}>
      {/* eslint-disable-next-line max-len */}
      <div className={`Ov Flex J-C-C A-I-C F-F-C-N F-W ${className} ${imgClassName ? imgClassName : ''} ${width < 769 ? 'N-P' : ' '}`}
        ref={ref} style={{ width: imWidth, height: imHeight }}>
        {component}
        {children ? children : null}
      </div>

      {cldI
        ? (
          <CloudinaryImage imageWidth={imWidth} imageHeight={imHeight}
            folders={folders} imageName={imageName} alt={alt}
          />
        )
        : (
          <img src={src} loading="lazy" alt={alt}
            className={`${className} ${imgClassName}`}
          />
        )}
    </div>
  );
};
