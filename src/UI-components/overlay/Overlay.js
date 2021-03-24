import React, {useEffect, useRef, useState} from 'react';
import './Overlay.css';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Animation} from "../../animation/Animation";

export const Overlay = ({
                          id,
                          src,
                          alt,
                          src320,
                          src480,
                          src768,
                          src991,
                          src1199,
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
                          animationOnHover,
                          animationOnClick
                        }) => {

  Overlay.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  };

  Overlay.defaultProps = {
    id: null,
    src: null,
    alt: '',
    src320: null,
    src480: null,
    src768: null,
    src991: null,
    src1199: null,
    imageType: 'listImage',
    type: 'button',
    text: '',
    link: null,
    onClick: null,
    linkClassName: '',
    buttonClassName: '',
    pictureRef: null,
    animationType: 'none',
    animationOnHover: false,
    animationOnClick: false
  };

  const [className, setClassName] = useState('listImage');
  let component;
  const ref = useRef();

  useEffect(() => {
    switch (imageType) {
      case 'listImage':
        setClassName('listImage');
        break;
      case 'product':
        setClassName('productImage');
        break;
      case 'similarProduct':
        setClassName('similarProductImage');
        break;
      case '300x400':
        setClassName('Image-Width300-Height400');
        break;
      case 'none':
        setClassName('');
        break;
      default:
        break;
    }
  }, [])

  function onFocus() {
    if (ref && ref.current) {
      ref.current.addEventListener("focus", ref.current.classList.add('opacity-1'))
    }
  }

  function onFocusOut() {
    if (ref && ref.current) {
      ref.current.addEventListener("focusout", ref.current.classList.remove('opacity-1'))
    }
  }

  if (type === 'link') {
    component =
      <Animation onHover={animationOnHover} onClick={animationOnClick} type={animationType}>
        <Link to={link} className={linkClassName} onFocus={() => onFocus()} onBlur={() => onFocusOut()}>
          {text}
        </Link>
      </Animation>;
  } else if (type === 'button') {
    component =
      <Animation onHover={animationOnHover} onClick={animationOnClick} type={animationType}>
        <button onClick={onClick} className={buttonClassName} onFocus={() => onFocus()}
                onBlur={() => onFocusOut()}>
          {text}
        </button>
      </Animation>;
  } else if (type === 'text') {
    component = <p>{text}</p>;
  } else {
    component =
      component = <p>{text}</p>;
  }

  return (
    <picture ref={pictureRef && pictureRef} id={id}
             className={'Overlay-Container ' + className}>

      <div className={'Overlay ' + className} ref={ref}>
        {component}
        {children ? children : null}
      </div>

      <source srcSet={src} media="(min-width: 1200px)"/>
      <source srcSet={src1199} media="(min-width: 992px) and (max-width: 1199px)"/>
      <source srcSet={src991} media="(min-width: 768px) and (max-width: 991px)"/>
      <source srcSet={src768} media="(max-width: 768px)"/>
      <source srcSet={src480} media="(max-width: 480px)"/>
      <source srcSet={src320} media="(max-width: 320px)"/>

      <img src={src} alt={alt} className={className}/>
    </picture>
  );
};

export function childLinkFocus() {
  document.querySelectorAll('picture.Overlay-Container div.Overlay a').forEach((item) => {
    console.log(item)

    item.addEventListener('focus', () => {
      item.parentElement.classList.add('opacity-1');
    });
    item.addEventListener('focusout', () => {
      item.parentElement.classList.remove('opacity-1');
    });
  });
}