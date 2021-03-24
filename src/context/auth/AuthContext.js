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
  addDeliveryAddress: (address) => {
  },
  removeDeliveryAddress: (id) => {
  },
  clearAddressesList: () => {
  },
  saveName: (name) => {
  }
});