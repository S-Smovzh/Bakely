import React, { useContext, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import { FrameContext } from '../../context/frame/FrameContext';
import './Card.css';

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 100,
  (x - rect.left - rect.width / 2) / 100,
  1.15
];

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

// eslint-disable-next-line react/prop-types
export const Card = ({ backType, className, type, children }) => {
  Card.propTypes = {
    backType: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string
  };

  Card.defaultProps = {
    backType: '',
    className: '',
    type: ''
  };

  const { frame } = useContext(FrameContext);
  const [xys, set] = useState([0, 0, 1]);
  const props = useSpring({
    xys, config: {
      mass: 1,
      tension: 240,
      friction: 100,
      clamp: false,
      precision: 1,
      velocity: 0,
      easing: (t) => t
    }
  });

  return (
    <React.Fragment>
      {type === 'no-animation' ? (
        <div className={`Card Flex J-C-C A-I-C F-F-C-N ${(backType === 'gray' ? 'Gray ' : '')} 
        ${(className ? className : '')}`}>
          {children}
        </div>
      ) : (
        <animated.div
          className={`Card Flex J-C-C A-I-C F-F-C-N ${(backType === 'gray' ? 'Gray ' : '')} ${(className ? className : '')}`}
          onMouseMove={(e) => set(calc(e.clientX, e.clientY, frame))}
          onMouseLeave={() => set([0, 0, 1])}
          // eslint-disable-next-line react/prop-types
          style={{ transform: props.xys.to(trans) }}>
          {children}
        </animated.div>
      )}
    </React.Fragment>
  );
};
