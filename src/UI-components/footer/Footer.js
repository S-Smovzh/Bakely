import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import useWindowDimensions from '../../utils/isTouchDevice';
import instagram from '../../images/icons/social-media/instagram.svg';
import facebook from '../../images/icons/social-media/facebook.svg';
import telegram from '../../images/icons/social-media/telegram.svg';
import twitter from '../../images/icons/social-media/twitter.svg';

export const Footer = () => {
  const [ t ] = useTranslation(); // TODO translation
  const [show, setShow] = useState({
    legal: false,
    info: false,
    aboutUs: false,
    socialMedia: false
  });
  const { width } = useWindowDimensions();

  const footerTop = [
    {
      className: 'Legal',
      header: t('legal.header'),
      onClick: () => setShow({ ...show, legal: !show.legal }),
      trigger: show.legal,
      list: [
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/cookie-policy`}>
            Cookie Policy
          </Link>,
          index: 1
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/privacy-policy`}>
            Privacy Policy
          </Link>,
          index: 2
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/terms-and-conditions`}>
            Terms & Conditions
          </Link>,
          index: 3
        }
      ]
    },
    {
      className: 'Info',
      header: t('info.header'),
      onClick: () => setShow({ ...show, info: !show.info }),
      trigger: show.info,
      list: [
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/faq`}>
            FAQ
          </Link>,
          index: 4
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/orders`}>
            Orders
          </Link>,
          index: 5
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/delivery`}>
            Delivery
          </Link>,
          index: 6
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/attribution`}>
            Attribution
          </Link>,
          index: 6
        }
      ]
    },
    {
      className: 'About-Us',
      header: t('aboutUs.header'),
      onClick: () => setShow({ ...show, aboutUs: !show.aboutUs }),
      trigger: show.aboutUs,
      list: [
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/news`}>
            News
          </Link>,
          index: 7
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/about`}>
            History
          </Link>,
          index: 8
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/gallery`}>
            Gallery
          </Link>,
          index: 9
        },
        {
          markup: <Link className="Footer-Link h6-size" to={`/${i18n.language}/contact-us`}>
            Contacts
          </Link>,
          index: 10
        }
      ]
    },
    {
      className: 'Social-Media',
      header: t('social.header'),
      onClick: () => setShow({ ...show, socialMedia: !show.socialMedia }),
      trigger: show.socialMedia,
      list: [
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://facebook.com">
            <img src={facebook} alt="Facebook icon"
              className="Icon"
            />
          </a>,
          index: 12
        },
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://instagram.com">
            <img src={instagram} alt="Instagram icon"
              className="Icon"
            />
          </a>,
          index: 13
        },
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://web.telegram.org">
            <img src={telegram} alt="Telegram icon"
              className="Icon"
            />
          </a>,
          index: 14
        },
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://twitter.com">
            <img src={twitter} alt="Twitter icon"
              className="Icon"
            />
          </a>,
          index: 15
        }
      ]
    }
  ];

  return (
    <footer id="footer" className="Footer Grid">
      <nav className="Footer-T">
        <React.Fragment>
          {footerTop.map((section, index) => (
            <section key={index} className={`${section.className} Grid`}>
              <h5 className={width < 992 ? 'T-C' : undefined}>{section.header}</h5>
              <ul className={`L-L Flex F-F-C-N ${section.className === 'Social-Media' ? 'J-C-S-B' : ''}`}>
                {section.list.map((item, index) => (
                  <li key={index} className="Flex A-I-F-S J-C-C F-W">
                    {item.markup}
                  </li>
                ))}
              </ul>
            </section>
          )
          )}
        </React.Fragment>
      </nav>
      <section className="Footer-B">
        <p className="Flex A-I-C J-C-F-S copyright F-H F-W">
          &copy; All rights reserved 2007-2021
        </p>
      </section>
    </footer>
  );
};
