import React, {useContext, useEffect, useState} from 'react';
import LanguageButton from '../button/language/LanguageButton';
import CartContext from '../../context/cart/CartContext';
import AuthContext from "../../context/auth/AuthContext";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import useWindowDimensions, {isTouchDevice} from "../../utils/isTouchDevice";
import {NavbarMenuContext} from "../../context/navbar-menu/NavbarMenuContext";
import {timer} from "rxjs";

export const Navbar = () => {
  const [t] = useTranslation();
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navbarMenuContext = useContext(NavbarMenuContext);
  const {height, width} = useWindowDimensions();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice);
  }, [height, width]);

  return (
    <header className='Navbar Grid'>
      <nav role='navigation' className='Navbar-Top Grid'>
        {!isTouch ?
          <React.Fragment>
            <a className='Link helper SkipLink Flex J-C-C A-I-C' href='#main' tabIndex='1000'>Skip to main section</a>
            <a className='Link helper SkipLink Flex J-C-C A-I-C' href='#footer' tabIndex='1000'>Skip to footer section</a>
          </React.Fragment>
          : null}
      </nav>
      <nav role='navigation' className='Navbar-Bottom Grid'>
        {width > 768 ?
          <React.Fragment>
            <div className='Navbar-LeftRow Flex J-C-C A-I-C'>
              <ul className='fill-width fill-height Flex J-C-S-B A-I-C'>
                <li className='button-small'>
                  <Link to='/' className='button-primary fill-height fill-width'
                        aria-label={t('navbar.ariaLabel.main')}>
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
            <div className='Navbar-RightRow Flex J-C-C A-I-C'>
              <ul className='fill-width fill-height Flex J-C-S-B A-I-C'>
                <li>
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
                  <button id='cart-button'
                          className={'button button-primary button-icon ' + (cartContext.show ? 'Active' : '')}
                          onClick={() => {
                            cartContext.cartButtonInteraction(true);
                            cartContext.showCart(!cartContext.show);
                            cartContext.loadProducts();
                            timer(300).subscribe(() => cartContext.cartButtonInteraction(false));
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
          </React.Fragment>
          :
          <React.Fragment>
            <div className='fill-width'>
              <ul className='fill-width fill-height Flex J-C-S-A A-I-C'>
                <li>
                  <button id='menu'
                          className={'button button-primary button-icon ' + (navbarMenuContext.show ? 'Active' : '')}
                          onClick={() => navbarMenuContext.setNavbar({show: true})}
                          aria-label={t('navbar.ariaLabel.openMenu')}>
                    <img src='http://localhost:3000/img/icons/list.svg' alt='' className='icon'/>
                  </button>
                </li>
                <li>
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
                  <button id='cart-button'
                          className={'button button-primary button-icon ' + (cartContext.show ? 'Active' : '')}
                          onClick={() => {
                            cartContext.cartButtonInteraction(true);
                            cartContext.showCart(!cartContext.show);
                            cartContext.loadProducts();
                            timer(300).subscribe(() => cartContext.cartButtonInteraction(false));
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
            {/*  <button id='menu'*/}
            {/*          className={'button button-primary button-icon ' + (navbarMenuContext.show ? 'Active' : '')}*/}
            {/*          onClick={() => navbarMenuContext.setNavbar({show: true})}*/}
            {/*          aria-label={t('navbar.ariaLabel.openMenu')}>*/}
            {/*    <img src='http://localhost:3000/img/icons/list.svg' alt='' className='icon'/>*/}
            {/*  </button>*/}
            {/*</div>*/}
            {/*<div className='Navbar-RightRow'>*/}
            {/*  <ul>*/}
            {/*    <li>*/}
            {/*      <button id='cart-button'*/}
            {/*              className={'button button-primary button-icon ' + (cartContext.show ? 'Active' : '')}*/}
            {/*              onClick={() => {*/}
            {/*                cartContext.showCart(!cartContext.show);*/}
            {/*                cartContext.loadProducts();*/}
            {/*              }} aria-label={t('navbar.ariaLabel.cart')}>*/}
            {/*        <div>*/}
            {/*          {cartContext.cart && cartContext.cart.length}*/}
            {/*        </div>*/}
            {/*        <img src='http://localhost:3000/img/icons/shopping-cart.svg' alt='' className='icon'/>*/}
            {/*      </button>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <LanguageButton/>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            </div>
          </React.Fragment>}
      </nav>
    </header>
  );
};
