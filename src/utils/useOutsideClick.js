import {useContext, useEffect, useRef} from "react";

export default function useOutsideClick() {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    elementRef.current && observer.observe(elementRef.current);
    return () => {
      elementRef.current && observer.unobserve(elementRef.current)
    }
  }, [elementRef])

  return [elementRef];
}