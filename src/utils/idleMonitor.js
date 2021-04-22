import React, {useEffect, useRef, useState} from "react";
import {timer} from "rxjs";

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
    for (let i in events) {
      elementRef.current && elementRef.current.addEventListener(events[i], () => {
        setEventTrigger(true);
        timer(300000).subscribe(() => setEventTrigger(false));
      });
    }

    return () => {
      for (let i in events) {
        elementRef.current && elementRef.current.removeEventListener(events[i], () => {
          setEventTrigger(true);
          timer(300000).subscribe(() => setEventTrigger(false));
        });
      }
    }
  }, [elementRef]);

  return [elementRef, eventTrigger];
}