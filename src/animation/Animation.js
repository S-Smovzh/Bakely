import React, {useEffect, useState} from "react";
import {timer} from "rxjs";
import './Animation.css';
import PropTypes from "prop-types";

export const Animation = ({
                            active,
                            inactivityTiming,
                            infinite,
                            onClick,
                            onHover,
                            onInactivity,
                            type,
                            children
                          }) => {

  Animation.propTypes = {
    active: PropTypes.bool,
    inactivityTiming: PropTypes.number,
    infinite: PropTypes.bool,
    onClick: PropTypes.bool.isRequired,
    onHover: PropTypes.bool.isRequired,
    onInactivity: PropTypes.bool,
    type: PropTypes.string.isRequired
  }

  Animation.defaultProps = {
    active: false,
    inactivityTiming: 999999,
    infinite: false,
    onClick: false,
    onHover: false,
    onInactivity: false,
    type: 'none'
  }

  const [animationType, setAnimationType] = useState('');
  const [start, setStart] = useState(false);
  const delay = 600;

  useEffect(() => {
    switch (type) {
      case 'bounce':
        setAnimationType('Bounce');
        break;
      case 'error-shake':
        setAnimationType('Error-Shake');
        break;
      case 'pop':
        setAnimationType('Pop');
        break;
      case 'pop-on-the-top':
        setAnimationType('Pop-On-The-Top');
        break;
      case 'pulsate':
        setAnimationType('Pulsate');
        break;
      case 'rotate-360':
        setAnimationType('Rotate-360');
        break;
      case 'rubber':
        setAnimationType('Rubber');
        break;
      case 'skew':
        setAnimationType('Skew');
        break;
      case 'wiggle':
        setAnimationType('Wiggle');
        break;
      case 'none':
        setAnimationType('');
        break;
      default:
        setAnimationType('')
    }

    setStart(active);

  }, [type])

  return (
    <div className={infinite ? `Infinite ${animationType}` : start ? animationType : ' '}
         onClick={() => {
           if (onClick) {
             setStart(true);
             timer(delay).subscribe(() => setStart(false));
           }
         }}
         onMouseEnter={() => {
           if (onHover) {
             setStart(true);
             timer(delay).subscribe(() => setStart(false));
           }
         }}
         onMouseLeave={() => {
           if (onHover) {

           }
         }}>
      {children}
    </div>
  );
}