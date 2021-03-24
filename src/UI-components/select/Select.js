import PropTypes from "prop-types";
import React from "react";

export const Select = ({
                         selectId, labelText, errorLabelText,
                         selectOnChange, selectOnBlur, errorIdentifier,
                         selectName, value, children
                       }) => {

  Select.propTypes = {
    selectOnChange: PropTypes.func.isRequired,
    selectOnBlur: PropTypes.func.isRequired,
    selectName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  Select.defaultProps = {
    value: null,
    selectClassName: '',
    labelDisabled: '',
    selectTabIndex: 0,
    labelTabIndex: 0
  };

  return (
    <React.Fragment>
      <label htmlFor={selectId} className='Form-Label fill-width h6-size'
             tabIndex='-1'>{labelText}
      </label>
      <div className='Form-InputRow fill-width'>
        <select id={selectId}
                className={'Form-Select fill-width ' + (errorIdentifier ? 'Select-Error' : '')}
                onBlur={selectOnBlur}
                onChange={selectOnChange} value={value} name={selectName}>
          {children}

        </select>
      </div>
      <p className={errorIdentifier ? 'Form-Label-Error fill-width flex' : 'none'}>
        {errorIdentifier ? errorLabelText : null}
      </p>
    </React.Fragment>
  );

}