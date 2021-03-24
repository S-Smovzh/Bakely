import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/auth/AuthContext";

export const Footer = () => {

  return (
    <footer id='footer' className='Footer'>
      <nav aria-label='Footer navigation block' className='Footer-Top'>
        <section className='Legal'>
          <h5>LEGAL</h5>
          <ul className='LinksList'>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/cookie-policy'>
                Cookie Policy
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/privacy-policy'>
                Privacy Policy
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/terms-and-conditions'>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </section>
        <section className='Info'>
          <h5>INFO</h5>
          <ul className='LinksList'>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/faq'>
                FAQ
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/orders'>
                Orders
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/delivery'>
                Delivery
              </Link>
            </li>
          </ul>
        </section>
        <section className='AboutUs'>
          <h5>ABOUT US</h5>
          <ul className='LinksList'>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/news'>
                News
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/about'>
                History
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/gallery'>
                Gallery
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/careers'>
                Careers
              </Link>
            </li>
            <li className='fill-width'>
              <Link className='Footer-Link h6-size' to='/contact-us'>
                Contacts
              </Link>
            </li>
          </ul>
        </section>
        <section className='SocialMedia'>
          <h5>SOCIAL MEDIA</h5>
          <ul className='SocialMedia-List'>
            <li>
              <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://facebook.com'>
                <img src='http://localhost:3000/img/icons/social-media/facebook.svg' alt='Facebook icon' className='icon'/>
              </a>
            </li>
            <li>
              <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://instagram.com'>
                <img src='http://localhost:3000/img/icons/social-media/instagram.svg' alt='Instagram icon' className='icon'/>
              </a>
            </li>
            <li>
              <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://web.telegram.org'>
                <img src='http://localhost:3000/img/icons/social-media/telegram.svg' alt='Telegram icon' className='icon'/>
              </a>
            </li>
            <li>
              <a className='Footer-Link h6-size button-primary button-icon-footer' href='https://twitter.com'>
                <img src='http://localhost:3000/img/icons/social-media/twitter.svg' alt='Twitter icon' className='icon'/>
              </a>
            </li>
          </ul>
        </section>
      </nav>
      <section className='Footer-Bottom'>
        <p className='copyright fill-height fill-width'>
          &copy; All rights reserved 2007-2021
        </p>
      </section>
    </footer>
  );
};
