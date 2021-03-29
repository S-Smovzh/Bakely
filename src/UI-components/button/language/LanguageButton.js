import React, {useEffect, useRef, useState} from 'react';
import './LanguageButton.css';
import i18n from '../../../utils/i18n';
import {useTranslation} from "react-i18next";

export default function LanguageButton() {
  const [toggle, setToggle] = useState(false);
  const [clicksCount, setClicksCount] = useState(0);
  const [t] = useTranslation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  const setLanguageCookie = (event) => {
    const target = event.target;

    if (target.matches('button img')) {
      let language = target.parentElement.getAttribute('data-lang');
      changeLanguage(language);
    } else if (target.matches('button')) {
      let language = target.getAttribute('data-lang');
      changeLanguage(language);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).catch((error) => console.log(error));
  };

  function useToggleListener(refOfMenu, refOfToggle) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (refOfMenu.current && !(refOfMenu.current.contains(event.target) || refOfToggle.current.contains(event.target))) {
          setClicksCount(0);
          setToggle(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [refOfMenu, refOfToggle]);
  }

  useToggleListener(menuRef, toggleRef);

  return (
    <React.Fragment>
      <button className='button-primary button-icon Dropdown-Toggle' type='button'
              onClick={() => {
                if (clicksCount !== 0) {
                  setToggle(!(clicksCount % 2));
                } else {
                  setToggle(true);
                }
                setClicksCount(clicksCount + 1);
              }} ref={toggleRef} aria-label={t('navbar-menu.ariaLabel.langButton')}>
        <img src='http://localhost:3000/img/icons/world.svg' alt='' className='icon'/>
      </button>

      <div className={toggle ? 'Dropdown-Menu flex' : 'Dropdown-Menu none'} ref={menuRef}>
        <button className='Dropdown-Item button-secondary button-icon-dropdown' type='button' data-lang='en'
                onClick={(event) => setLanguageCookie(event)} aria-label={t('navbar-menu.ariaLabel.langButton.en')}>
          <img src='http://localhost:3000/img/icons/gb.svg'
               alt='' className='icon-flag'/>
        </button>
        <button className='Dropdown-Item button-secondary button-icon-dropdown' type='button' data-lang='ru'
                onClick={(event) => setLanguageCookie(event)} aria-label={t('navbar-menu.ariaLabel.langButton.ru')}>
          <img src='http://localhost:3000/img/icons/ru.svg'
               alt='' className='icon-flag'/>
        </button>
        <button className='Dropdown-Item button-secondary button-icon-dropdown' type='button' data-lang='ua'
                onClick={(event) => setLanguageCookie(event)} aria-label={t('navbar-menu.ariaLabel.langButton.ua')}>
          <img src='http://localhost:3000/img/icons/ua.svg'
               alt='' className='icon-flag'/>
        </button>
      </div>
    </React.Fragment>);
}
