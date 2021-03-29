import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useWindowDimensions from "../../utils/isTouchDevice";
import {useTranslation} from "react-i18next";

export const Footer = () => {

  const {width} = useWindowDimensions();
  const [t] = useTranslation();
  const [showLegal, setShowLegal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showSocialMedial, setShowSocialMedia] = useState(false);

  const legalList = [
    <Link className='Footer-Link h6-size fill-width' to='/cookie-policy'>
      Cookie Policy
    </Link>,
    <Link className='Footer-Link h6-size' to='/privacy-policy'>
      Privacy Policy
    </Link>,
    <Link className='Footer-Link h6-size' to='/terms-and-conditions'>
      Terms & Conditions
    </Link>
  ];

  const infoList = [
    <Link className='Footer-Link h6-size' to='/faq'>
      FAQ
    </Link>,
    <Link className='Footer-Link h6-size' to='/orders'>
      Orders
    </Link>,
    <Link className='Footer-Link h6-size' to='/delivery'>
      Delivery
    </Link>
  ];

  const aboutUsList = [
    <Link className='Footer-Link h6-size' to='/news'>
      News
    </Link>,
    <Link className='Footer-Link h6-size' to='/about'>
      History
    </Link>,
    <Link className='Footer-Link h6-size' to='/gallery'>
      Gallery
    </Link>,
    <Link className='Footer-Link h6-size' to='/careers'>
      Careers
    </Link>,
    <Link className='Footer-Link h6-size' to='/contact-us'>
      Contacts
    </Link>
  ];

  const socialMediaList = [
    <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://facebook.com'>
      <img src='http://localhost:3000/img/icons/social-media/facebook.svg' alt='Facebook icon'
           className='icon'/>
    </a>,
    <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://instagram.com'>
      <img src='http://localhost:3000/img/icons/social-media/instagram.svg' alt='Instagram icon'
           className='icon'/>
    </a>,
    <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://web.telegram.org'>
      <img src='http://localhost:3000/img/icons/social-media/telegram.svg' alt='Telegram icon'
           className='icon'/>
    </a>,
    <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://twitter.com'>
      <img src='http://localhost:3000/img/icons/social-media/twitter.svg' alt='Twitter icon'
           className='icon'/>
    </a>
  ];


  return (
    <footer id='footer' className='Footer'>
      <nav className='Footer-Top'>
        {width > 991 ?
          <React.Fragment>
            <section className='Legal'>
              <h5>LEGAL</h5>
              <ul className='LinksList'>
                {legalList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
            <section className='Info'>
              <h5>INFO</h5>
              <ul className='LinksList'>
                {infoList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
            <section className='AboutUs'>
              <h5>ABOUT US</h5>
              <ul className='LinksList'>
                {aboutUsList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
            <section className='SocialMedia'>
              <h5>SOCIAL MEDIA</h5>
              <ul className='SocialMedia-List'>
                {socialMediaList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
          </React.Fragment>
          :
          <React.Fragment>
            <section className='Legal'>
              <button className='button-primary' onClick={() => setShowLegal(!showLegal)}>
                LEGAL
              </button>
              <ul className={'LinksList ' + (showLegal ? '' : 'Hidden none')}>
                {legalList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
            <section className='Info'>
              <button className='button-primary' onClick={() => setShowInfo(!showInfo)}>
                INFO
              </button>
              <ul className={'LinksList ' + (showInfo ? '' : 'Hidden none')}>
                {infoList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
            <section className='AboutUs'>
              <button className='button-primary' onClick={() => setShowAboutUs(!showAboutUs)}>
                ABOUT US
              </button>
              <ul className={'LinksList ' + (showAboutUs ? '' : 'Hidden none')}>
                {aboutUsList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
            <section className='SocialMedia'>
              <button className='button-primary'
                      onClick={() => setShowSocialMedia(!showSocialMedial)}>
                SOCIAL MEDIA
              </button>
              <ul className={'SocialMedia-List ' + (showSocialMedial ? '' : 'Hidden none')}>
                {socialMediaList.map((item, index) =>
                  <li key={index} className='fill-width'>
                    {item}
                  </li>)}
              </ul>
            </section>
          </React.Fragment>
        }
      </nav>
      <section className='Footer-Bottom'>
        <p className='copyright fill-height fill-width'>
          &copy; All rights reserved 2007-2021
        </p>
      </section>
    </footer>
  );
};
