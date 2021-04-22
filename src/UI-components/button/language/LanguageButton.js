import React, {useEffect, useRef, useState} from 'react';
import './LanguageButton.css';
import i18n from '../../../utils/i18n';
import {useTranslation} from "react-i18next";
import {Button} from "../Button";

export default function LanguageButton() {
  const [toggle, setToggle] = useState(false);
  const [clicksCount, setClicksCount] = useState(0);
  const [t] = useTranslation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  const languages = ['en', 'ru', 'ua'];

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
        if (refOfMenu.current && !(refOfMenu.current.contains(event.target) || refOfToggle.current && refOfToggle.current.contains(event.target))) {
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
      <Button className='button-primary button-icon Dropdown-Toggle' type='button'
              onClick={() => {
                if (clicksCount !== 0) {
                  setToggle(!(clicksCount % 2));
                } else {
                  setToggle(true);
                }
                setClicksCount(clicksCount + 1);
              }} buttonRef={toggleRef} aria-label={t('navbar-menu.ariaLabel.langButton')}>
        <img src='http://localhost:3000/img/icons/world.svg' alt='' className='icon'/>
      </Button>

      <div className={toggle ? 'Dropdown-Menu Flex J-C-C A-I-C F-F-C-N' : 'Dropdown-Menu none'} ref={menuRef}>
        {languages.map((item, index) =>
          <button key={index} className='Dropdown-Item Flex J-C-C A-I-C button-secondary button-icon-dropdown' type='button' data-lang={item}
                  onClick={(event) => setLanguageCookie(event)}
                  aria-label={t(`navbar-menu.ariaLabel.langButton.${item}`)}>
            <img src={`http://localhost:3000/img/icons/${item}.svg`}
                 alt='' className='icon-flag'/>
          </button>
        )}
      </div>
    </React.Fragment>);
}
