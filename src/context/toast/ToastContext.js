import React from 'react';

export const ToastContext = React.createContext({
  showSubscription: false,
  showCookie: false,
  hoverTipShow: false,
  tipTop: '70%',
  verified: false,
  setModal: () => {
  }
});