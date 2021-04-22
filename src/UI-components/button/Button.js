import './Button.css';
import PropTypes from "prop-types";

export const Button = ({ariaLabel, className, disabled, name, onClick, buttonRef, type, children}) => {

  Button.propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    buttonRef: PropTypes.any,
    type: PropTypes.string
  };

  Button.defaultProps = {
    ariaLabel: '',
    className: '',
    disabled: false,
    name: '',
    onClick: null,
    buttonRef: null,
    type: 'button'
  };

  return (
    <button aria-label={ariaLabel} className={`Button Flex J-C-C A-I-C T-C ${className}`} disabled={disabled}
            name={name} onClick={onClick} ref={buttonRef} type={type}>
      {children}
    </button>);
}