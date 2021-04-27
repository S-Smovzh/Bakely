import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useWindowDimensions from "../../utils/isTouchDevice";
import {useTranslation} from "react-i18next";

export const Footer = () => {
  const {width} = useWindowDimensions();
  const [t] = useTranslation(); //TODO translation
  const [show, setShow] = useState({
    legal: false,
    info: false,
    aboutUs: false,
    socialMedia: false
  });

  const footerTop = [
    {
      className: 'Legal',
      header: t('legal.header'),
      onClick: () => setShow({...show, legal: !show.legal}),
      trigger: show.legal,
      list: [
        {
          markup: <Link className='Footer-Link h6-size' to='/cookie-policy'>
            Cookie Policy
          </Link>,
          index: 1
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/privacy-policy'>
            Privacy Policy
          </Link>,
          index: 2
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/terms-and-conditions'>
            Terms & Conditions
          </Link>,
          index: 3
        }
      ]
    },
    {
      className: 'Info',
      header: t('info.header'),
      onClick: () => setShow({...show, info: !show.info}),
      trigger: show.info,
      list: [
        {
          markup: <Link className='Footer-Link h6-size' to='/faq'>
            FAQ
          </Link>,
          index: 4
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/orders'>
            Orders
          </Link>,
          index: 5
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/delivery'>
            Delivery
          </Link>,
          index: 6
        }
      ]
    },
    {
      className: 'AboutUs',
      header: t('aboutUs.header'),
      onClick: () => setShow({...show, aboutUs: !show.aboutUs}),
      trigger: show.aboutUs,
      list: [
        {
          markup: <Link className='Footer-Link h6-size' to='/news'>
            News
          </Link>,
          index: 7
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/about'>
            History
          </Link>,
          index: 8
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/gallery'>
            Gallery
          </Link>,
          index: 9
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/careers'>
            Careers
          </Link>,
          index: 10
        },
        {
          markup: <Link className='Footer-Link h6-size' to='/contact-us'>
            Contacts
          </Link>,
          index: 11
        }
      ]
    },
    {
      className: 'SocialMedia',
      header: t('social.header'),
      onClick: () => setShow({...show, socialMedia: !show.socialMedia}),
      trigger: show.socialMedia,
      list: [
        {
          markup: <a className='Footer-Link h6-size button-primary button-icon' href='https://facebook.com'>
            <img src='http://localhost:3000/img/icons/social-media/facebook.svg' alt='Facebook icon'
                 className='icon'/>
          </a>,
          index: 12
        },
        {
          markup: <a className='Footer-Link h6-size button-primary button-icon' href='https://instagram.com'>
            <img src='http://localhost:3000/img/icons/social-media/instagram.svg' alt='Instagram icon'
                 className='icon'/>
          </a>,
          index: 13
        },
        {
          markup: <a className='Footer-Link h6-size button-primary button-icon' href='https://web.telegram.org'>
            <img src='http://localhost:3000/img/icons/social-media/telegram.svg' alt='Telegram icon'
                 className='icon'/>
          </a>,
          index: 14
        },
        {
          markup: <a className='Footer-Link h6-size button-primary button-icon' href='https://twitter.com'>
            <img src='http://localhost:3000/img/icons/social-media/twitter.svg' alt='Twitter icon'
                 className='icon'/>
          </a>,
          index: 15
        }
      ]
    }
  ];

  return (
    <footer id='footer' className='Footer Grid'>
      <nav className='Footer-Top'>
          <React.Fragment>
            {footerTop.map((section, index) =>
              <section key={index} className={`${section.className} Grid`}>
                <h5 className={width < 992 ? 'T-C' : undefined}>{section.header}</h5>
                <ul className='LinksList Flex F-F-C-N'>
                  {section.list.map((item, index) =>
                    <li key={index} className={`Flex A-I-F-S ${width < 992 ? 'J-C-C' : 'J-C-F-S'} fill-width`}>
                      {item.markup}
                    </li>)}
                </ul>
              </section>
            )}
          </React.Fragment>
      </nav>
      <section className='Footer-Bottom'>
        <p className='Flex A-I-C J-C-F-S copyright fill-height fill-width'>
          &copy; All rights reserved 2007-2021
        </p>
      </section>
    </footer>
  );
};
