import {InputTooltip} from "../tooltip/Tooltip";
import React from "react";
import PropTypes from "prop-types";

export const Textarea = ({
                           id,
                           labelText,
                           errorIdentifier,
                           className,
                           autoComplete,
                           value,
                           tooltipId,
                           overlayPlacement,
                           errorLabelText,
                           disabled,
                           name,
                           required,
                           onChange,
                           onBlur,
                           tooltipText,
                           textareaLimit,
                         }) => {

  Textarea.propTypes = {
    errorIdentifier: PropTypes.string.isRequired,
    errorLabelText: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    labelText: PropTypes.string.isRequired,
    textareaLimit: PropTypes.number,
    tooltipId: PropTypes.string.isRequired,
    tooltipText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  Textarea.defaultProps = {
    errorIdentifier: '',
    errorLabelText: '',
    className: '',
    disabled: false,
    id: '',
    name: '',
    onBlur: null,
    onChange: null,
    required: false,
    labelText: '',
    textareaLimit: 999999,
    tooltipId: '',
    tooltipText: '',
    value: ''
  };

  return (
    <React.Fragment>
      <div className='Form-TextareaRow Grid fill-width'>
        <label htmlFor={id} className='Form-Label Flex A-S-F-S fill-width h6-size'
               tabIndex='-1'>{labelText}</label>
        <textarea id={id}
                  className={`${errorIdentifier ? 'Input-Error' : ''} Textarea fill-width ${className}`}
                  disabled={disabled} maxLength={textareaLimit}
                  name={name} onChange={onChange} onBlur={onBlur}
                  required={required} value={value}/>
        <InputTooltip tooltipId={tooltipId} tooltipText={tooltipText} overlayPlacement={overlayPlacement}/>
      </div>
      <p
        className={errorIdentifier ? 'Form-Label-Error Flex A-S-F-S fill-width copyright' : 'none'}>
        {errorLabelText ? errorLabelText : null}
      </p>
    </React.Fragment>
  );
}