import React, { useContext, useEffect } from 'react';
import { Trail, animated, config } from 'react-spring';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { NavbarMenuContext } from '../../context/navbar-menu/NavbarMenuContext';
import useWindowDimensions from '../../utils/useWindowDimensions';
import useOutsideClick from '../../utils/useOutsideClick';
import logo from '../../../assets/images/icons/logo.svg';
import './Menu.css';

export const Menu = () => {
  const { navbar, setNavbar } = useContext(NavbarMenuContext);
  const { width } = useWindowDimensions();
  const [ t ] = useTranslation();
  const [ elementRef ] = useOutsideClick('menu', () => setNavbar({ show: false }));
  const location = useLocation();

  useEffect(() => setNavbar({ show: false }), [ location ]);

  useEffect(() => {
    if (width > 768) {
      setNavbar({ show: false });
    }
  }, [ width ]);

  const navbarMenuList = [
    {
      markup:
  <React.Fragment>
    <Link to={`/${i18n.language}/`} className="Btn-P F-W h6-size"
      aria-label={t('navbar.ariaLabel.main')}>
      <img src={logo} alt="" className="Icon-Logo"/> Main
    </Link>
  </React.Fragment>,
      index: 1
    },
    {
      markup:
  <React.Fragment>
    <Link to={`/${i18n.language}/shop`} className="Btn-P F-W h6-size">
      {t('navbar.order')}
    </Link>
  </React.Fragment>,
      index: 2
    },
    {
      markup:
  <React.Fragment>
    <Link to={`/${i18n.language}/catering`} className="Btn-P F-W h6-size">
      {t('navbar.catering')}
    </Link>
  </React.Fragment>,
      index: 3
    },
    {
      markup:
  <React.Fragment>
    <Link to={`/${i18n.language}/locations`} className="Btn-P F-W h6-size">
      {t('navbar.locations')}
    </Link>
  </React.Fragment>,
      index: 4
    },
    {
      markup:
  <React.Fragment>
    <button className="Btn-P F-W h6-size"
      onClick={() => setNavbar({ show: false })} aria-label={t('navbar.ariaLabel.closeMenu')}>
      {t('button.close')}
    </button>
  </React.Fragment>,
      index: 5
    }
  ];

  return (
    // eslint-disable-next-line max-len
    <animated.div style={width < 769 ? { transform: navbar.show ? 'translateX(0)' : 'translateX(-100%)' } : { transform: 'translateX(-100%)' }}
      className={`Menu Flex J-C-C A-I-C F-H ${!navbar.show ? 'Hidden' : ''}`} ref={elementRef}>
      <div className="Ct F-W">
        <ul className="Flex J-C-S-A A-I-C F-F-C-W F-W">
          <Trail items={navbarMenuList}
            config={config.gentle}
            keys={item => item.index}
            from={{ opacity: 0, transform: 'translateX(-100%)' }}
            to={{ transform: `translateX(${navbar.show ? '0' : '-100%'})`, opacity: 1 }}>
            {/* eslint-disable-next-line react/display-name */}
            {(item, index) => props => (
              <animated.li style={props} key={index} className="Menu-Item Flex J-C-C A-I-C F-W h5-size">
                {item.markup}
              </animated.li>
            )}
          </Trail>
        </ul>
      </div>
    </animated.div>
  );
};
