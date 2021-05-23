import { useEffect, useState } from 'react';

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(matchMedia('(hover: none)').matches);
  }, []);

  return { isTouchDevice };
}
