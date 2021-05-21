import React from 'react';
import PropTypes from 'prop-types';
import { InputTooltip } from '../tooltip/Tooltip';

export const Textarea = ({
  className,
  disabled,
  errorIdentifier,
  errorLabelText,
  id,
  labelText,
  name,
  onBlur,
  onChange,
  overlayPlacement,
  required,
  textareaLimit,
  tooltipId,
  tooltipText,
  value
}) => {
  Textarea.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    errorIdentifier: PropTypes.string.isRequired,
    errorLabelText: PropTypes.string.isRequired,
    id: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    overlayPlacement: PropTypes.string,
    required: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    textareaLimit: PropTypes.number,
    tooltipId: PropTypes.string.isRequired,
    tooltipText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  Textarea.defaultProps = {
    className: '',
    disabled: false,
    errorIdentifier: '',
    errorLabelText: '',
    id: '',
    labelText: '',
    name: '',
    onBlur: null,
    onChange: null,
    overlayPlacement: 'right',
    required: false,
    textareaLimit: 999999,
    tooltipId: '',
    tooltipText: '',
    value: ''
  };

  return (
    <React.Fragment>
      <div className="Form-Ta-R Grid F-W">
        <label htmlFor={id} className="Form-L Flex A-S-F-S F-W h6-size"
          tabIndex="-1">{labelText}</label>
        <textarea id={id}
          className={`${errorIdentifier ? 'I-E' : ''} Ta F-W ${className}`}
          disabled={disabled} maxLength={textareaLimit}
          name={name} onChange={onChange} onBlur={onBlur}
          required={required} value={value}
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
