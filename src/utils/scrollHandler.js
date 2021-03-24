import React, {useContext, useEffect, useRef} from 'react';
import {ToastContext} from "../context/toast/ToastContext";

export default function useOnScreen(options, top) {
  const elementRef = useRef(null);
  const {toast, setToast} = useContext(ToastContext);

  const callback = (entries) => {
    const [entry] = entries;
    setToast({
      ...toast, hoverTipShow: entry.isIntersecting, tipTop: top
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    elementRef.current && observer.observe(elementRef.current);
    return () => {
      elementRef.current && observer.unobserve(elementRef.current)
    }
  }, [elementRef])

  return [elementRef];
}