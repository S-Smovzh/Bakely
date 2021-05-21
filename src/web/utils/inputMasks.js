import { useEffect, useRef, useState } from 'react';
import { timer } from 'rxjs';

export const masks = {
  'tel': '999 999-99-99'
};

export default function useDigitPress() {
  const elementRef = useRef(null);
  const [pasteProhibited, setPasteProhibited] = useState(false);
  const keyCodes = [
    'Digit0',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Numpad0',
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowDown',
    'ArrowUp'
  ];


  useEffect(() => {
    elementRef.current && elementRef.current.addEventListener('keydown', (event) => {
      if (!keyCodes.includes(event.code)) {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    elementRef.current && elementRef.current.addEventListener('change', (event) => {
      if (event.target.value.length >= 3 && !(event.target.value.substring(3, 4) === ' ')) {
        event.target.value = event.target.value.substring(0, 3) + ' ' + event.target.value.substring(3);
      }
      if (event.target.value.length >= 7 && !(event.target.value.substring(7, 8) === '-')) {
        event.target.value = event.target.value.substring(0, 7) + '-' + event.target.value.substring(7);
      }
      if (event.target.value.length >= 10 && !(event.target.value.substring(10, 11) === '-')) {
        event.target.value = event.target.value.substring(0, 10) + '-' + event.target.value.substring(10);
      }
    });

    elementRef.current && elementRef.current.addEventListener('paste', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setPasteProhibited(true);
      timer(100).subscribe(() => setPasteProhibited(false));
    });

    return () => {
      elementRef.current && elementRef.current.removeEventListener('keydown', (event) => {
        if (!keyCodes.includes(event.code)) {
          event.preventDefault();
          event.stopPropagation();
        }
      });
      elementRef.current && elementRef.current.removeEventListener('change', (event) => {
        if (event.target.value.length >= 3 && !(event.target.value.substring(3, 4) === ' ')) {
          event.target.value = event.target.value.substring(0, 3) + ' ' + event.target.value.substring(3);
        }
        if (event.target.value.length >= 7 && !(event.target.value.substring(7, 8) === '-')) {
          event.target.value = event.target.value.substring(0, 7) + '-' + event.target.value.substring(7);
        }
        if (event.target.value.length >= 10 && !(event.target.value.substring(10, 11) === '-')) {
          event.target.value = event.target.value.substring(0, 10) + '-' + event.target.value.substring(10);
        }
      });
      elementRef.current && elementRef.current.removeEventListener('paste', (event) => {
        event.preventDefault();
        event.stopPropagation();
        timer(100).subscribe(() => setPasteProhibited(false));
      });
    };
  }, [ elementRef ]);

  return [elementRef, pasteProhibited];
}
