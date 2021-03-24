import React from 'react';
import './Slides.css';
import {Link} from "react-router-dom";

export default function Slide({
                                description,
                                descriptionClass,
                                imgSrc,
                                link,
                                linkClass,
                                linkText,
                                title,
                                titleClass,
                              }) {

  Slide.defaultProps = {
    description: '',
    descriptionClass: '',
    imgSrc: '',
    link: '',
    linkClass: '',
    linkText: '',
    title: '',
    titleClass: '',
  };

  return (
    <div className='Slide' style={{backgroundImage: `url('${imgSrc}')`}}>
      <div className='Slide-Content fill-width'>
        <h1 className={'Slide-Title Playfair h2-size ' + titleClass}>
          {title}
        </h1>
        <p className={'Slide-Description h4-size font-weight_400 Nunito ' + descriptionClass}>
          {description}
        </p>
      </div>
      <div className='Button-Container'>
        <Link to={link} className={'Nunito h4-size ' + linkClass}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}