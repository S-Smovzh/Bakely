import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18n';
import { logError } from '../../../error/errorHandler';
import { Button } from '../Button';
import './LanguageButton.css';
import world from '../../../../assets/images/icons/world.svg';
import enFlag from '../../../../assets/images/icons/en.svg';
import ruFlag from '../../../../assets/images/icons/ru.svg';
import uaFlag from '../../../../assets/images/icons/ua.svg';


export default function LanguageButton() {
  const [toggle, setToggle] = useState(false);
  const [clicksCount, setClicksCount] = useState(0);
  const [ t ] = useTranslation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

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
    const pathname = location.pathname.split('/');

    pathname[1] = lng;
    i18n.changeLanguage(lng).catch((error) => logError(error));

    history.push({ pathname: pathname.join('/') });
  };

  function useToggleListener(refOfMenu, refOfToggle) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (refOfMenu.current && !(refOfMenu.current.contains(event.target)
          || refOfToggle.current && refOfToggle.current.contains(event.target))) {
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
      <Button className="Btn-P Btn-I D-T" type="button"
        onClick={() => {
                if (clicksCount !== 0) {
                  setToggle(!(clicksCount % 2));
                } else {
                  setToggle(true);
                }
                setClicksCount(clicksCount + 1);
              }}
        buttonRef={toggleRef} ariaLabel={t('navbar.ariaLabel.langButton')}>
        <img src={world} alt="" className="Icon"/>
      </Button>

      <div className={`D-M ${toggle ? 'Flex J-C-C A-I-C F-F-C-N' : 'None'}`} ref={menuRef}>
        {languages.map((item, index) => {
            let flag;

            switch (item) {
              case 'en':
                flag = enFlag;
                break;
              case 'ru':
                flag = ruFlag;
                break;
              case 'ua':
                flag = uaFlag;
                break;
              default:
                flag = enFlag;
                break;
            }

            return (
              <button key={index} className="D-I Flex J-C-C A-I-C Btn-S Btn-I-D"
                type="button" data-lang={item}
                onClick={(event) => setLanguageCookie(event)}
                aria-label={t(`navbar.ariaLabel.langButton.${item}`)}>
                <img src={flag}
                  alt="" className="Icon-Flag"
                />
              </button>
            );
          }
        )}
      </div>
    </React.Fragment>
  );
}
