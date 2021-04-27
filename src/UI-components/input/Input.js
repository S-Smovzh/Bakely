import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import {InputTooltip} from '../tooltip/Tooltip';
import './Input.css';

export const Input = ({
                        autoComplete,
                        errorIdentifier,
                        errorLabelText,
                        inputDisabled,
                        inputId,
                        inputMode,
                        inputName,
                        inputOnBlur,
                        inputOnChange,
                        inputRequired,
                        inputType,
                        labelText,
                        mask,
                        max,
                        min,
                        overlayPlacement,
                        selectOnChange,
                        selectValue,
                        tooltipId,
                        tooltipText,
                        value
                      }) => {
  Input.propTypes = {
    autoComplete: PropTypes.string,
    errorIdentifier: PropTypes.string.isRequired,
    errorLabelText: PropTypes.string.isRequired,
    inputDisabled: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    inputId: PropTypes.string,
    inputMode: PropTypes.string,
    inputName: PropTypes.string.isRequired,
    inputOnBlur: PropTypes.func.isRequired,
    inputOnChange: PropTypes.func.isRequired,
    inputRequired: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    inputType: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    mask: PropTypes.any,
    max: PropTypes.number,
    min: PropTypes.number,
    selectOnChange: PropTypes.func,
    selectValue: PropTypes.any,
    textareaLimit: PropTypes.number,
    tooltipId: PropTypes.string.isRequired,
    tooltipText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  Input.defaultProps = {
    autoComplete: 'off',
    errorIdentifier: '',
    errorLabelText: '',
    inputDisabled: false,
    inputId: '',
    inputMode: 'text',
    inputName: '',
    inputOnBlur: null,
    inputOnChange: null,
    inputRequired: false,
    inputType: 'text',
    labelText: '',
    mask: null,
    max: null,
    min: null,
    selectOnChange: null,
    selectValue: null,
    textareaLimit: 9999,
    tooltipId: '',
    tooltipText: '',
    value: ''
  };

  return (
    <React.Fragment>
      <label htmlFor={inputId} className='Form-Label Flex A-S-F-S fill-width h6-size'
             tabIndex='-1'>{labelText}</label>
      <div className={`Form-InputRow Grid fill-width ${(inputType === 'tel' ? 'Tel-Input' : '')}`}>
        {inputType === 'tel' ?
          <select className='Form-Select Select__TelCode h6-size' onChange={selectOnChange} value={selectValue}>
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
                   className={`${(errorIdentifier ? 'Input-Error' : '')} fill-width Form-Input Flex A-S-F-S inputClassName`}
                   disabled={inputDisabled} mask={mask}
                   type={inputType} name={inputName} autoComplete={autoComplete}
                   onChange={inputOnChange} onBlur={inputOnBlur}
                   required={inputRequired} value={value} inputMode={inputMode} min={min} max={max}/>
        <InputTooltip tooltipId={tooltipId} tooltipText={tooltipText} overlayPlacement={overlayPlacement}/>
      </div>
      <p
        className={errorIdentifier ? 'Form-Label-Error Flex A-S-F-S fill-width copyright' : 'none'}>
        {errorLabelText ? errorLabelText : null}
      </p>
    </React.Fragment>
  );
};
