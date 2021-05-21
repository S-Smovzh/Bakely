import React from 'react';

export default React.createContext({
  logged: false,
  addresses: [],
  name: '',
  login: () => {
  },
  logout: () => {
  },
  checkState: () => {
  },
  loadDeliveryAddresses: () => {
  },
  addDeliveryAddress: () => {
  },
  removeDeliveryAddress: () => {
  },
  clearAddressesList: () => {
  },
  saveName: () => {
  }
});
