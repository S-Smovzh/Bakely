import { useEffect, useRef, useState } from 'react';
import { timer } from 'rxjs';

export default function useMonitor() {
  const elementRef = useRef(null);
  const [eventTrigger, setEventTrigger] = useState(true);
  const events = [
    'load',
    'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress'
  ];

  useEffect(() => {
    // eslint-disable-next-line guard-for-in
    for (let i in events) {
      // eslint-disable-next-line no-unused-expressions
      elementRef.current && elementRef.current.addEventListener(events[i], () => {
        setEventTrigger(true);
        timer(300000).subscribe(() => setEventTrigger(false));
      });
    }

    return () => {
      // eslint-disable-next-line guard-for-in
      for (let i in events) {
        // eslint-disable-next-line no-unused-expressions
        elementRef.current && elementRef.current.removeEventListener(events[i], () => {
          setEventTrigger(true);
          timer(300000).subscribe(() => setEventTrigger(false));
        });
      }
    };
  }, [ elementRef ]);

  return [elementRef, eventTrigger];
}
