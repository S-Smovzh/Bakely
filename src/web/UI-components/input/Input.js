import React from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { InputTooltip } from '../tooltip/Tooltip';
import './Input.css';
import { Dropdown } from 'react-bootstrap';

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
  telNumPrefix,
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
      PropTypes.bool
    ]),
    inputId: PropTypes.string,
    inputMode: PropTypes.string,
    inputName: PropTypes.string.isRequired,
    inputOnBlur: PropTypes.func.isRequired,
    inputOnChange: PropTypes.func.isRequired,
    inputRequired: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    inputType: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    mask: PropTypes.any,
    max: PropTypes.number,
    min: PropTypes.number,
    overlayPlacement: PropTypes.string,
    selectOnChange: PropTypes.func,
    telNumPrefix: PropTypes.string,
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
    overlayPlacement: 'bottom',
    selectOnChange: null,
    telNumPrefix: '+38',
    tooltipId: '',
    tooltipText: '',
    value: ''
  };

  return (
    <React.Fragment>
      <label htmlFor={inputId} className="Form-L Flex A-S-F-S F-W h6-size"
        tabIndex="-1">{labelText}</label>
      <div className={`Form-I-R Grid F-W ${(inputType === 'tel' ? 'Tel-I' : '')}`}>
        {inputType === 'tel' ? (
          <Dropdown onSelect={selectOnChange}>
            <Dropdown.Toggle variant={null} id={`number-dropdown-${inputId}`}
              className="F-W Form-Sel Sel-Tel-C h6-size Btn-S tel">
              {telNumPrefix}
            </Dropdown.Toggle>
            <Dropdown.Menu className="F-W T-M Flex F-F-C-N" flip={false}>
              <Dropdown.Item eventKey="+38 " className="Flex J-C-C A-I-C T-C">
                +38
              </Dropdown.Item>
              <Dropdown.Item eventKey="+7 " className="Flex J-C-C A-I-C T-C">
                +7
              </Dropdown.Item>
              <Dropdown.Item eventKey="+1 " className="Flex J-C-C A-I-C T-C">
                +1
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
          : null}
        <InputMask id={inputId}
          className={`${(errorIdentifier ? 'I-E' : '')} F-W Form-I Flex A-S-F-S`}
          disabled={inputDisabled} mask={mask}
          type={inputType} name={inputName} autoComplete={autoComplete}
          onChange={inputOnChange} onBlur={inputOnBlur}
          required={inputRequired} value={value} inputMode={inputMode}
          min={min} max={max}
        />
        <InputTooltip tooltipId={tooltipId} tooltipText={tooltipText} overlayPlacement={overlayPlacement}/>
      </div>
      <p
        className={errorIdentifier ? 'Form-L-E Italic Flex A-S-F-S F-W copyright' : 'None'}>
        {errorLabelText ? errorLabelText : null}
      </p>
    </React.Fragment>
  );
};
