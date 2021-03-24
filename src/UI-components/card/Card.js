import React from 'react';
import './Card.css';
import {useSpring, animated} from 'react-spring';

export const Card = ({children, type, backType, className}) => {
  let calc, trans;
  const [props, set] = useSpring(() => ({xys: [0, 0, 1], config: {mass: 1, tension: 240, friction: 100}}));

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
      <div className={'Card ' + (backType === 'gray' ? 'Gray' : '') + (className ? className : '')}
           onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
           onMouseLeave={() => set({xys: [0, 0, 1]})}
           style={{transform: props.xys.interpolate(trans)}}>
        {children}
      </div>)
  }

  return (
    <animated.div className={'Card ' + (backType === 'gray' ? 'Gray' : '') + (className ? className : '')}
                  onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
                  onMouseLeave={() => set({xys: [0, 0, 1]})}
                  style={{transform: props.xys.interpolate(trans)}}>
      {children}
    </animated.div>
  );
};