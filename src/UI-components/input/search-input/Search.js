import React from "react";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Button} from "../../button/Button";
import '../Input.css';

export const Search = ({
                         buttonOnClick,
                         inputClassName,
                         inputDisabled,
                         inputName,
                         inputOnBlur,
                         inputOnChange,
                         value
                       }) => {
  Search.propTypes = {
    buttonOnClick: PropTypes.func,
    inputClassName: PropTypes.string,
    inputDisabled: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    inputName: PropTypes.string.isRequired,
    inputOnBlur: PropTypes.func.isRequired,
    inputOnChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };

  Search.defaultProps = {
    buttonOnClick: null,
    inputClassName: '',
    inputDisabled: false,
    inputName: '',
    inputOnBlur: null,
    inputOnChange: null,
    value: ''
  };

  const [t] = useTranslation();

  return (
    <div className='Form-InputRow Grid fill-width '>
      <input className={`Form-Input Flex A-S-F-S fill-width ${inputClassName}`} disabled={inputDisabled}
             type='text' name={inputName} autoComplete='off' inputMode='text'
             onChange={inputOnChange} onBlur={inputOnBlur} tabIndex='0'
             required={false} value={value} placeholder={t('placeholder.search')}/>
      <Button ariaLabel={t('button.details')}
              className='button-success Icon-Tooltip'
              onClick={buttonOnClick}
              type='button'>
        <img src='http://localhost:3000/img/icons/search.svg' alt='' className='icon'/>
      </Button>
    </div>
  );
}
