import React from 'react';

export const ModalContext = React.createContext({
  cateringModal: false,
  locationModal: false,
  internalError: false,
  errorCode: 0,
  clientsOrder: false,
  usersOrder: false,
  activationModal: false,
  notActivated: false,
  setModal: () => {
  }
});
