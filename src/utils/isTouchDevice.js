// export function isTouchDevice() {
//   try {
//     let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
//
//     let mediaQuery = function (query) {
//       return window.matchMedia(query).matches;
//     };
//
//
//     if (('ontouchstart' in window) || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
//       return true;
//     }
//
//     // 'terminate' stops join()
//     return mediaQuery(['(', prefixes.join('touch-enabled),('), 'terminate', ')'].join(''));
//   } catch (e) {
//     // console.error('(Touch detect failed)', e);
//     return false;
//   }
// }

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function isTouchDevice() {
  return ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0);
}