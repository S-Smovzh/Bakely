import React from 'react';

export const OrderFormContext = React.createContext({
  delivery: false,
  selfPickUp: false,
  proceedOrder: false,
  bakery: '',
  comment: '',
  setOrderForm: () => {
  }
});