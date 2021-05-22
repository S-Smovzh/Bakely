import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import shopCart from '../../../assets/images/icons/shopping-cart.svg';
import homepage from '../../../assets/images/icons/homepage.svg';
import logout from '../../../assets/images/icons/logout.svg';
import logo from '../../../assets/images/icons/logo.svg';
import user from '../../../assets/images/icons/user.svg';
import list from '../../../assets/images/icons/list.svg';
import { NavbarMenuContext } from '../../context/navbar-menu/NavbarMenuContext';
import useWindowDimensions, { isTouchDevice } from '../../utils/isTouchDevice';
import LanguageButton from '../button/language/LanguageButton';
import CartContext from '../../context/cart/CartContext';
import AuthContext from '../../context/auth/AuthContext';

export const Navbar = () => {
  const [ t ] = useTranslation();
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navbarMenuContext = useContext(NavbarMenuContext);
  const { height, width } = useWindowDimensions();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice);
  }, [height, width]);

  return (
    <header className="Nav Grid">
      <nav role="navigation" className="Nav-T Grid">
        {!isTouch ? (
          <React.Fragment>
            <a className="Link helper SkipLink Flex J-C-C A-I-C" href="#main" tabIndex="1000">Skip to main section</a>
            <a className="Link helper SkipLink Flex J-C-C A-I-C" href="#footer" tabIndex="1000">Skip to footer section</a>
          </React.Fragment>
          )
          : null}
      </nav>
      <nav role="navigation" className="Nav-B Grid">
        {width > 768 ? (
          <React.Fragment>
            <div className="Nav-L-R Flex J-C-C A-I-C">
              <ul className="F-W F-H Flex J-C-S-B A-I-C">
                <li className="Btn-Sm">
                  <Link to={`/${i18n.language}/`} className="Btn-P F-H F-W"
                    aria-label={t('navbar.ariaLabel.main')}>
                    <img src={logo} alt="" className="Icon-Logo"/>
                  </Link>
                </li>
                <li className="Btn-Sm">
                  <Link to={`/${i18n.language}/shop`} className="Btn-P F-H F-W h6-size">
                    {t('navbar.order')}
                  </Link>
                </li>
                <li className="Btn-Sm">
                  <Link to={`/${i18n.language}/catering`} className="Btn-P F-H F-W h6-size">
                    {t('navbar.catering')}
                  </Link>
                </li>
                <li className="Btn-Sm">
                  <Link to={`/${i18n.language}/locations`} className="Btn-P F-H F-W h6-size">
                    {t('navbar.locations')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="Nav-R-R Flex J-C-C A-I-C">
              <ul className="F-W F-H Flex J-C-S-B A-I-C">
                <li>
                  {authContext.logged
                      ? (
                        <button className="Btn-P Btn-I" onClick={() => authContext.logout()}
                          aria-label={t('navbar.ariaLabel.logOut')}>
                          <img src={logout} alt="" className="Icon"/>
                        </button>
                      )
                      : (
                        <Link to={`/${i18n.language}/user/login`} className="Btn-P Btn-I"
                          aria-label={t('navbar.ariaLabel.login')}>
                          <img src={user} alt="" className="Icon"/>
                        </Link>
                      )}
                </li>
                {authContext.logged
                    ? (
                      <li>
                        <Link to={`/${i18n.language}/user/homepage`} className="Btn-P Btn-I"
                          aria-label={t('navbar.ariaLabel.homepage')}>
                          <img src={homepage} alt="" className="Icon"/>
                        </Link>
                      </li>
                    )
                    :
                    null}
                <li>
                  <button id="cart-button"
                    className={`'Btn Btn-P Btn-I ${(cartContext.show ? 'Active' : '')}`}
                    onClick={() => {
                              cartContext.showCart(!cartContext.show);
                              cartContext.loadProducts();
                            }}
                    aria-label={t('navbar.ariaLabel.cart')}>
                    <div>
                      {cartContext.cart && cartContext.cart.length}
                    </div>
                    <img src={shopCart} alt="" className="Icon"/>
                  </button>
                </li>
                <li>
                  <LanguageButton/>
                </li>
              </ul>
            </div>
          </React.Fragment>
          )
          : (
            <React.Fragment>
              <div className="F-W">
                <ul className="F-W F-H Flex J-C-S-A A-I-C">
                  <li>
                    <button id="menu"
                      className={`Btn Btn-P Btn-I ${(navbarMenuContext.show ? 'Active' : '')}`}
                      onClick={() => navbarMenuContext.setNavbar({ show: true })}
                      aria-label={t('navbar.ariaLabel.openMenu')}>
                      <img src={list} alt="" className="Icon"/>
                    </button>
                  </li>
                  <li>
                    {authContext.logged
                      ? (
                        <button className="Btn-P Btn-I" onClick={() => authContext.logout()}
                          aria-label={t('navbar.ariaLabel.logOut')}>
                          <img src={logout} alt="" className="Icon"/>
                        </button>
                      )
                      : (
                        <Link to={`/${i18n.language}/user/login`} className="Btn-P Btn-I"
                          aria-label={t('navbar.ariaLabel.login')}>
                          <img src={user} alt="" className="Icon"/>
                        </Link>
                      )}
                  </li>
                  {authContext.logged
                    ? (
                      <li>
                        <Link to={`/${i18n.language}/user/homepage`} className="Btn-P Btn-I"
                          aria-label={t('navbar.ariaLabel.homepage')}>
                          <img src={homepage} alt="\" className="Icon"/>
                        </Link>
                      </li>
                    )
                    :
                    null}
                  <li>
                    <button id="cart-button"
                      className={`Btn Btn-P Btn-I ${(cartContext.show ? 'Active' : '')}`}
                      onClick={() => {
                              cartContext.showCart(!cartContext.show);
                              cartContext.loadProducts();
                            }}
                      aria-label={t('navbar.ariaLabel.cart')}>
                      <div>
                        {cartContext.cart && cartContext.cart.length}
                      </div>
                      <img src={shopCart} alt="" className="Icon"/>
                    </button>
                  </li>
                  <li>
                    <LanguageButton/>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          )}
      </nav>
    </header>
  );
};
