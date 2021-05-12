import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import './Card.css';

// eslint-disable-next-line react/prop-types
export const Card = ({ backType, className, type, children }) => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 240, friction: 100 } }));

  let calc;

  let trans;

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

  if (type === 'product') {
    calc = (x, y) => [-(y - window.innerHeight / 4) / 100, (x - window.innerWidth / 4) / 100, 1.15];
    trans = (x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  } else if (type === 'cart-item') {
    calc = (x, y) => [-(y - window.innerHeight / 4) / 100, (x - window.innerWidth / 4) / 100, 1.05];
    trans = (x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  } else if (type === 'location') {
    calc = (x, y) => [-(y - window.innerHeight / 4) / 100, (x - window.innerWidth / 4) / 100, 1.15];
    trans = (x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  } else {
    calc = (x, y) => [-(y - window.innerHeight / 4) / 100, (x - window.innerWidth / 4) / 100, 1.15];
    trans = (x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  }

  if (type === 'no-animation') {
    return (
      <div
        className={`Card Flex J-C-C A-I-C F-F-C-N ${(backType === 'gray' ? 'Gray ' : '')} ${(className ? className : '')}`}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        // eslint-disable-next-line react/prop-types
        style={{ transform: props.xys.interpolate(trans) }}>
        {children}
      </div>
    );
  }

  return (
    <animated.div
      className={`Card Flex J-C-C A-I-C F-F-C-N ${(backType === 'gray' ? 'Gray ' : '')} ${(className ? className : '')}`}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      // eslint-disable-next-line react/prop-types
      style={{ transform: props.xys.interpolate(trans) }}>
      {children}
    </animated.div>
  );
};
