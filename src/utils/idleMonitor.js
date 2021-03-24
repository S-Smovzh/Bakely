import React, {useEffect, useRef, useState} from "react";
import {timer} from "rxjs";

export default function useMonitor() {
  const elementRef = useRef(null);
  const [eventTrigger, setEventTrigger] = useState(false);
  const events = [
    'load',
    'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress'
  ];

  useEffect(() => {
    for (let i in events) {
      elementRef.current && elementRef.current.addEventListener(events[i], (event) => {
        setEventTrigger(true);
        timer(100).subscribe(() => setEventTrigger(false));
      });
    }

    return () => {
      for (let i in events) {
        elementRef.current && elementRef.current.removeEventListener(events[i], (event) => {
          setEventTrigger(true);
          timer(100).subscribe(() => setEventTrigger(false));
        });
      }
    }
  }, [elementRef]);

  return [elementRef, eventTrigger];
}