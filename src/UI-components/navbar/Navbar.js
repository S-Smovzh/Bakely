import React, {useContext, useEffect, useState} from 'react';
import LanguageButton from '../button/language/LanguageButton';
import CartContext from '../../context/cart/CartContext';
import AuthContext from "../../context/auth/AuthContext";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import useWindowDimensions, {isTouchDevice} from "../../utils/isTouchDevice";

export const Navbar = () => {
  const [t] = useTranslation();
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
const [isTouch, setIsTouch] = useState(false);
  const { height, width } = useWindowDimensions();

useEffect(()=>{
    setIsTouch(isTouchDevice);
  }, [height, width])

  return (
    <header className='Navbar'>
      {!isTouch ?
      <nav role='navigation' className='Navbar-Top'>
        <a className='Link helper SkipLink' href='#main' tabIndex='1000'>Skip to main section</a>
        <a className='Link helper SkipLink' href='#footer' tabIndex='1000'>Skip to footer section</a>
      </nav> : null}
      <nav role='navigation' className='Navbar-Bottom'>
        <div className='Navbar-LeftRow'>
          <ul className='fill-width fill-height'>
            <li className='button-small'>
              <Link to='/' className='button-primary fill-height fill-width' aria-label={t('navbar.ariaLabel.main')}>
                <img src='http://localhost:3000/img/icons/logo.svg' alt='' className='logo-icon'/>
              </Link>
            </li>
            <li className='button-small'>
              <Link to='/shop' className='button-primary fill-height fill-width h6-size'>
                {t('navbar.order')}
              </Link>
            </li>
            <li className='button-small'>
              <Link to='/catering' className='button-primary fill-height fill-width h6-size'>
                {t('navbar.catering')}
              </Link>
            </li>
            <li className='button-small'>
              <Link to='/locations' className='button-primary fill-height fill-width h6-size'>
                {t('navbar.locations')}
              </Link>
            </li>
          </ul>
        </div>
        <div className='Navbar-RightRow'>
          <ul className='fill-width fill-height'>
            <li>
              {authContext.logged
                ?
                <button className='button-primary button-icon' onClick={() => authContext.logout()}
                        aria-label={t('navbar.ariaLabel.logOut')}>
                  <img src='http://localhost:3000/img/icons/logout.svg' alt='' className='icon'/>
                </button>
                :
                <Link to='/user/login' className='button-primary button-icon' aria-label={t('navbar.ariaLabel.login')}>
                  <img src='http://localhost:3000/img/icons/user.svg' alt='' className='icon'/>
                </Link>}
            </li>
            {authContext.logged
              ?
              <li>
                <Link to='/user/homepage' className='button-primary button-icon'
                      aria-label={t('navbar.ariaLabel.homepage')}>
                  <img src='http://localhost:3000/img/icons/homepage.svg' alt='\' className='icon'/>
                </Link>
              </li>
              :
              null}
            <li>
              <button id='cart' className={'button button-primary button-icon ' + (cartContext.show ? 'Active' : '')}
                      onClick={() => {
                        cartContext.showCart(!cartContext.show);
                        cartContext.loadProducts();
                      }} aria-label={t('navbar.ariaLabel.cart')}>
                <div>
                  {cartContext.cart && cartContext.cart.length}
                </div>
                <img src='http://localhost:3000/img/icons/shopping-cart.svg' alt='' className='icon'/>
              </button>
            </li>
            <li>
              <LanguageButton/>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
