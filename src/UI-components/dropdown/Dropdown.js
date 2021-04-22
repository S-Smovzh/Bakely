import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Button} from "../button/Button";

export default function LanguageButton({className, children, toggleChildren, toggleClassName}) {
  const [toggle, setToggle] = useState(false);
  const [clicksCount, setClicksCount] = useState(0);
  const [t] = useTranslation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

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
      <Button className={`Dropdown-Toggle ${toggleClassName}`} type='button'
              onClick={() => {
                if (clicksCount !== 0) {
                  setToggle(!(clicksCount % 2));
                } else {
                  setToggle(true);
                }
                setClicksCount(clicksCount + 1);
              }} buttonRef={toggleRef} aria-label={t('navbar-menu.ariaLabel.langButton')}>
        {toggleChildren}
      </Button>

      <div className={`${className} ${toggle ? 'Flex J-C-C A-I-C F-F-C-N' : 'none'}`} ref={menuRef}>
        {children}
      </div>
    </React.Fragment>);
}
