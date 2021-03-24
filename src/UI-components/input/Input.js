import React from 'react';
import './Input.css';
import PropTypes from 'prop-types';
import {InputTooltip} from '../tooltip/Tooltip';
import InputMask from 'react-input-mask';

export const Input = ({
                        inputId, inputClassName, labelText, errorLabelText,
                        inputDisabled, inputOnChange, inputOnBlur, inputTabIndex,
                        inputRequired, errorIdentifier, inputType, textareaLimit,
                        inputName, autoComplete, tooltipText, tooltipId, value, buttonOnClick,
                        mask, inputMode, min, max, minLength, maxLength, selectOnChange, selectValue
                      }) => {

  let Component;

  Input.propTypes = {
    inputOnChange: PropTypes.func.isRequired,
    inputOnBlur: PropTypes.func.isRequired,
    inputType: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  Input.defaultProps = {
    value: null,
    inputClassName: '',
    labelClassName: '',
    errorLabelClassName: '',
    inputDisabled: '',
    labelDisabled: '',
    inputTabIndex: 0,
  };

  const RegularInput = () => {
    return (
      <React.Fragment>
        <label htmlFor={inputId} className='Form-Label fill-width h6-size'
               tabIndex='-1'>{labelText}</label>
        <div className={'Form-InputRow fill-width ' + (inputType === 'tel' ? 'Tel-Input' : '')}>
          {inputType === 'tel' ?
            <select className='Select__TelCode h6-size' onChange={selectOnChange} value={selectValue}>
              <option value='+38 '>
                +38
              </option>
              <option value='+7 '>
                +7
              </option>
              <option value='+1 '>
                +1
              </option>
            </select>
            : null}
          <InputMask id={inputId}
                 className={errorIdentifier ? 'Form-Input fill-width Input-Error' : 'Form-Input fill-width ' + inputClassName}
                 disabled={inputDisabled} mask={mask}
                 type={inputType} name={inputName} autoComplete={autoComplete}
                 onChange={inputOnChange} onBlur={inputOnBlur} tabIndex={inputTabIndex}
                 required={inputRequired} value={value} inputMode={inputMode} minLength={minLength}
                 maxLength={maxLength} min={min} max={max}/>
          <InputTooltip tooltipId={tooltipId} tooltipText={tooltipText}/>
        </div>
        <p
          className={errorIdentifier ? 'Form-Label-Error fill-width flex copyright' : 'none'}>
          {errorLabelText ? errorLabelText : null}
        </p>
      </React.Fragment>
    );
  }

  if (inputType === 'search') {
    Component =
      <React.Fragment>
        <div className='Form-InputRow fill-width '>
          <input className={'Form-Input fill-width ' + inputClassName} disabled={inputDisabled}
                 type={inputType} name={inputName} autoComplete='off'
                 onChange={inputOnChange} onBlur={inputOnBlur} tabIndex='0'
                 required={false} value={value} placeholder='Search...'/>
          <button className='Click for details button-success Input-SearchButton Icon-Tooltip' onClick={buttonOnClick}
                  type='button'>
            <img src='http://localhost:3000/img/icons/search.svg' alt='Question mark' className='icon'/>
          </button>
        </div>
      </React.Fragment>;
  } else if (inputType === 'textarea') {
    Component =
      <React.Fragment>
        <label htmlFor={inputId} className='Form-Label fill-width h6-size'
               tabIndex='-1'>{labelText}</label>
        <div className='Form-TextareaRow fill-width'>
          <textarea id={inputId}
                    className={errorIdentifier ? 'Textarea fill-width Input-Error' : 'Textarea fill-width ' + inputClassName}
                    disabled={inputDisabled} maxLength={textareaLimit}
                    name={inputName} autoComplete={autoComplete}
                    onChange={inputOnChange} onBlur={inputOnBlur} tabIndex={inputTabIndex}
                    required={inputRequired} value={value}/>
          <InputTooltip tooltipId={tooltipId} tooltipText={tooltipText}/>
        </div>
        <p
          className={errorIdentifier ? 'Form-Label-Error fill-width flex copyright' : 'none'}>
          {errorLabelText ? errorLabelText : null}
        </p>
      </React.Fragment>;
  } else {
    return RegularInput();
  }

  return Component;
};