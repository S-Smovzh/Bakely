import PropTypes from "prop-types";
import React from "react";

export const Select = ({
                         errorIdentifier,
                         errorLabelText,
                         labelText,
                         selectId,
                         selectName,
                         selectOnBlur,
                         selectOnChange,
                         value,
                         children
                       }) => {

  Select.propTypes = {
    errorIdentifier: PropTypes.string.isRequired,
    errorLabelText: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    selectId: PropTypes.string.isRequired,
    selectName: PropTypes.string.isRequired,
    selectOnBlur: PropTypes.func.isRequired,
    selectOnChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };

  Select.defaultProps = {
    errorIdentifier: '',
    errorLabelText: '',
    labelText: '',
    selectId: '',
    selectName: '',
    selectOnBlur: null,
    selectOnChange: null,
    value: ''
  };

  return (
    <React.Fragment>
      <label htmlFor={selectId} className='Form-Label fill-width h6-size' tabIndex='-1'>
        {labelText}
      </label>
      <div className='Form-InputRow fill-width'>
        <select id={selectId} className={`Form-Select fill-width ${(errorIdentifier ? 'Select-Error' : '')}`}
                name={selectName} onBlur={selectOnBlur} onChange={selectOnChange} value={value}>
          {children}
        </select>
      </div>
      <p className={errorIdentifier ? 'Form-Label-Error fill-width Flex' : 'none'}>
        {errorIdentifier ? errorLabelText : null}
      </p>
    </React.Fragment>
  );

}