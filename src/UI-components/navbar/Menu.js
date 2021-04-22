import React, {useContext, useEffect} from "react";
import {Trail} from "react-spring/renderprops-universal";
import {animated, config, useSpring} from "react-spring";
import {NavbarMenuContext} from "../../context/navbar-menu/NavbarMenuContext";
import useWindowDimensions from "../../utils/isTouchDevice";
import {Link, useLocation} from "react-router-dom";
import './Menu.css';
import {useTranslation} from "react-i18next";
import useOutsideClick from "../../utils/useOutsideClick";

export const Menu = () => {
  const {navbar, setNavbar} = useContext(NavbarMenuContext);
  const {width} = useWindowDimensions();
  const [t] = useTranslation();
  const [elementRef] = useOutsideClick('menu', () => setNavbar({show: false}));
  const location = useLocation();
  const navbarMenuAnimation = useSpring({
    transform: navbar.show ? 'translateX(0)' : 'translateX(-100%)'
  });

  useEffect(() => setNavbar({show: false}), [location]);

  useEffect(() => {
    if (width > 768) {
      setNavbar({show: false});
    }
  }, [width])

  const navbarMenuList = [
    {
      markup:
        <React.Fragment>
          <Link to='/' className='button-primary fill-width'
                aria-label={t('navbar.ariaLabel.main')}>
            <img src='http://localhost:3000/img/icons/logo.svg' alt='' className='logo-icon'/> Main
          </Link>
        </React.Fragment>,
      index: 1
    },
    {
      markup:
        <React.Fragment>
          <Link to='/shop' className='button-primary fill-width h6-size'>
            {t('navbar.order')}
          </Link>
        </React.Fragment>,
      index: 2
    },
    {
      markup:
        <React.Fragment>
          <Link to='/catering' className='button-primary fill-width h6-size'>
            {t('navbar.catering')}
          </Link>
        </React.Fragment>,
      index: 3
    },
    {
      markup:
        <React.Fragment>
          <Link to='/locations' className='button-primary fill-width h6-size'>
            {t('navbar.locations')}
          </Link>
        </React.Fragment>,
      index: 4
    },
    {
      markup:
        <React.Fragment>
          <button className='button-primary fill-width'
                  onClick={() => setNavbar({show: false})} aria-label={t('navbar.ariaLabel.closeMenu')}>
            CLOSE MENU
          </button>
        </React.Fragment>,
      index: 5
    }
  ];

  return (
    <animated.div className='Menu Flex J-C-C A-I-C' ref={elementRef}
                  style={width < 769 ? navbarMenuAnimation : {transform: 'translateX(-100%)'}}>
      <ul className='Flex J-C-S-A A-I-C F-F-C-W fill-width'>
        <Trail items={navbarMenuList}
               config={config.gentle}
               keys={item => item.index}
               from={{opacity: 0, transform: `translateX(-100%)`,}}
               to={{transform: `translateX(${navbar.show ? 0 : '-100%'})`, opacity: 1}}
               delay={navbar.show ? 10 : 0}>
          {(item, index) => props => (
            <animated.li style={props} key={index} className='Menu-Item Flex J-C-C A-I-C fill-width h5-size'>
              {item.markup}
            </animated.li>
          )}
        </Trail>
      </ul>
    </animated.div>
  );
}
