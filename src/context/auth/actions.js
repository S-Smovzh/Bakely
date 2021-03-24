import {
  LOGIN,
  LOGOUT,
  CHECK_STATE,
  LOAD_DELIVERY_ADDRESSES,
  ADD_DELIVERY_ADDRESS,
  REMOVE_DELIVERY_ADDRESS,
  CLEAR_ADDRESSES,
  SAVE_NAME
} from './actionTypes';

export const login = () => ({
  type: LOGIN
});

export const logout = () => ({
  type: LOGOUT
});

export const checkState = () => ({
  type: CHECK_STATE
});

export const loadDeliveryAddresses = (loadedAddresses) => ({
  type: LOAD_DELIVERY_ADDRESSES, addresses: loadedAddresses
});

export const addDeliveryAddress = (address) => ({
  type: ADD_DELIVERY_ADDRESS
});

export const removeDeliveryAddress = (id, event) => ({
  type: REMOVE_DELIVERY_ADDRESS
});

export const clearAddressesList = () => ({
  type: CLEAR_ADDRESSES
});

export const saveName = () => ({
  type: SAVE_NAME
});