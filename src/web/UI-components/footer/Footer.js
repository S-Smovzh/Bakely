import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import useWindowDimensions from '../../utils/isTouchDevice';
import instagram from '../../../assets/images/icons/social-media/instagram.svg';
import facebook from '../../../assets/images/icons/social-media/facebook.svg';
import telegram from '../../../assets/images/icons/social-media/telegram.svg';
import twitter from '../../../assets/images/icons/social-media/twitter.svg';

export const Footer = () => {
  const [ t ] = useTranslation();
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
      header: t('footer.header.legal'),
      onClick: () => setShow({ ...show, legal: !show.legal }),
      trigger: show.legal,
      list: [
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/cookie-policy`}>
            {t('footer.links.cooPol')}
          </Link>,
          index: 1
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/privacy-policy`}>
            {t('footer.links.privPol')}
          </Link>,
          index: 2
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/terms-and-conditions`}>
            {t('footer.links.termsCond')}
          </Link>,
          index: 3
        }
      ]
    },
    {
      className: 'Info',
      header: t('footer.header.info'),
      onClick: () => setShow({ ...show, info: !show.info }),
      trigger: show.info,
      list: [
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/faq`}>
            {t('footer.links.faq')}
          </Link>,
          index: 4
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/orders`}>
            {t('footer.links.orders')}
          </Link>,
          index: 5
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/delivery`}>
            {t('footer.links.delivery')}
          </Link>,
          index: 6
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/attribution`}>
            {t('footer.links.attr')}
          </Link>,
          index: 6
        }
      ]
    },
    {
      className: 'About-Us',
      header: t('footer.header.about'),
      onClick: () => setShow({ ...show, aboutUs: !show.aboutUs }),
      trigger: show.aboutUs,
      list: [
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/news`}>
            {t('footer.links.news')}
          </Link>,
          index: 7
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/about`}>
            {t('footer.links.history')}
          </Link>,
          index: 8
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/gallery`}>
            {t('footer.links.gallery')}
          </Link>,
          index: 9
        },
        {
          markup: <Link className={`Footer-Link h6-size ${width > 991 ? 'T-L' : 'T-C'} F-W`}
            to={`/${i18n.language}/contact-us`}>
            {t('footer.links.contacts')}
          </Link>,
          index: 10
        }
      ]
    },
    {
      className: 'Social-Media',
      header: t('footer.header.social'),
      onClick: () => setShow({ ...show, socialMedia: !show.socialMedia }),
      trigger: show.socialMedia,
      list: [
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://facebook.com">
            <img src={facebook} alt={t('footer.social.ariaLabel.facebook')}
              className="Icon"
            />
          </a>,
          index: 12
        },
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://instagram.com">
            <img src={instagram} alt={t('footer.social.ariaLabel.instagram')}
              className="Icon"
            />
          </a>,
          index: 13
        },
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://web.telegram.org">
            <img src={telegram} alt={t('footer.social.ariaLabel.telegram')}
              className="Icon"
            />
          </a>,
          index: 14
        },
        {
          markup: <a className="Footer-Link h6-size Btn-P Btn-I" href="https://twitter.com">
            <img src={twitter} alt={t('footer.social.ariaLabel.twitter')}
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
              <h2 className={`h5-size font-weight_900 ${width < 992 ? 'T-C' : 'T-L'}`}>{section.header}</h2>
              <ul className={`L-L Flex F-F-C-N ${section.className === 'Social-Media' ? 'J-C-S-B' : ''}`}>
                {section.list.map((item, index) => (
                  <li key={index} className={`Flex ${section.className === 'Social-Media' ? 'J-C-C' : ''} F-W`}>
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
          &copy; {t('footer.rights')}
        </p>
      </section>
    </footer>
  );
};
