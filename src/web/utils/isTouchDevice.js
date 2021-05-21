import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(_getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(_getWindowDimensions());
    }

    typeof window !== 'undefined' && window.addEventListener('resize', handleResize);
    return () => typeof window !== 'undefined' && window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function _getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = typeof window !== 'undefined' && window;

  return {
    width,
    height
  };
}

export function isTouchDevice() {
  // (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
  return matchMedia('(hover: None), (pointer: coarse)').matches;
}
