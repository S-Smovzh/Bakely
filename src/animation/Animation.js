import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { timer } from 'rxjs';
import './Animation.css';

export const Animation = ({
  active,
  className,
  infinite,
  onClick,
  onHover,
  type,
  children
}) => {
  Animation.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    infinite: PropTypes.bool,
    onClick: PropTypes.bool.isRequired,
    onHover: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.any
  };

  Animation.defaultProps = {
    active: false,
    className: '',
    infinite: false,
    onClick: false,
    onHover: false,
    type: 'none'
  };

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
        setAnimationType('');
    }

    setStart(active);
  }, [ type ]);

  return (
    <div className={(infinite ? `Infinite ${animationType}` : start ? animationType : ' ') + ' ' + className}
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
      }}>
      {children}
    </div>
  );
};
