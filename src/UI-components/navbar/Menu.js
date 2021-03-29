import React, {useContext} from "react";
import {Trail} from "react-spring/renderprops-universal";
import {animated, config, useSpring} from "react-spring";
import {NavbarMenuContext} from "../../context/navbar-menu/NavbarMenuContext";
import useWindowDimensions from "../../utils/isTouchDevice";
import {Link} from "react-router-dom";
import LanguageButton from "../button/language/LanguageButton";
import './Menu.css';
import {useTranslation} from "react-i18next";
import AuthContext from "../../context/auth/AuthContext";
import CartContext from "../../context/cart/CartContext";

export const Menu = () => {
  const {navbar, setNavbar} = useContext(NavbarMenuContext);
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const {width} = useWindowDimensions();
  const [t] = useTranslation();

  const navbarMenuAnimation = useSpring({
    transform: navbar.show ? 'translateX(0)' : 'translateX(-100%)'
  });

  const navbarMenuList = [
    {
      markup:
        <div className='fill-width fill-height Buttons-Row'>
          <React.Fragment>
            {authContext.logged
              ?
              <button className='button-primary button-icon' onClick={() => authContext.logout()}
                      aria-label={t('navbar.ariaLabel.logOut')}>
                <img src='http://localhost:3000/img/icons/logout.svg' alt='' className='icon'/>
              </button>
              :
              <Link to='/user/login' className='button-primary button-icon'
                    aria-label={t('navbar.ariaLabel.login')}>
                <img src='http://localhost:3000/img/icons/user.svg' alt='' className='icon'/>
              </Link>}
            <React.Fragment>
              {authContext.logged ?
                <Link to='/user/homepage' className='button-primary button-icon'
                      aria-label={t('navbar.ariaLabel.homepage')}>
                  <img src='http://localhost:3000/img/icons/homepage.svg' alt='\' className='icon'/>
                </Link>
                : null}
            </React.Fragment>
            <button id='cart'
                    className={'button button-primary button-icon ' + (cartContext.show ? 'Active' : '')}
                    onClick={() => {
                      cartContext.showCart(!cartContext.show);
                      cartContext.loadProducts();
                    }} aria-label={t('navbar.ariaLabel.cart')}>
              <div>
                {cartContext.cart && cartContext.cart.length}
              </div>
              <img src='http://localhost:3000/img/icons/shopping-cart.svg' alt='' className='icon'/>
            </button>
          </React.Fragment>
        </div>,
      index: 1
    },
    {
      markup:
        <React.Fragment>
          <Link to='/' className='button-primary fill-width'
                aria-label={t('navbar.ariaLabel.main')}>
            <img src='http://localhost:3000/img/icons/logo.svg' alt='' className='logo-icon'/> Main
          </Link>
        </React.Fragment>,
      index: 2
    },
    {
      markup:
        <React.Fragment>
          <Link to='/shop' className='button-primary fill-width h6-size'>
            {t('navbar.order')}
          </Link>
        </React.Fragment>,
      index: 3
    },
    {
      markup:
        <React.Fragment>
          <Link to='/catering' className='button-primary fill-width h6-size'>
            {t('navbar.catering')}
          </Link>
        </React.Fragment>,
      index: 4
    },
    {
      markup:
        <React.Fragment>
          <Link to='/locations' className='button-primary fill-width h6-size'>
            {t('navbar.locations')}
          </Link>
        </React.Fragment>,
      index: 5
    },
    {
      markup:
        <React.Fragment>
          <button className='button-primary fill-width'
                  onClick={() => setNavbar({show: false})} aria-label={t('navbar.ariaLabel.closeMenu')}>
            CLOSE MENU
          </button>
        </React.Fragment>,
      index: 6
    }
  ];

  return (
    <animated.ul className={'Menu '}
                 style={width < 768 ? navbarMenuAnimation : {transform: 'translateX(-100%)'}}>
      <Trail items={navbarMenuList}
             config={config.gentle}
             keys={item => item.index}
             from={{opacity: 0, transform: `translateX(-100%)`,}}
             to={{transform: `translateX(${navbar.show ? 0 : '-100%'})`, opacity: 1}}
             delay={navbar.show ? 100 : 0}>
        {(item, index) => props => (
          <animated.li style={props} key={index} className='Menu-Item fill-width h5-size'>
            {item.markup}
          </animated.li>
        )}
      </Trail>
    </animated.ul>
  );
}