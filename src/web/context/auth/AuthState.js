import React, { useReducer } from 'react';
import { fromBinary } from '../../utils/base64encoder';
import AuthContext from './AuthContext';
import { authReducer } from './reducer';
import {
  ADD_DELIVERY_ADDRESS,
  CHECK_STATE,
  LOGIN,
  LOGOUT,
  REMOVE_DELIVERY_ADDRESS,
  CLEAR_ADDRESSES,
  LOAD_DELIVERY_ADDRESSES,
  SAVE_NAME
} from './actionTypes';

// eslint-disable-next-line react/prop-types
export default function AuthState({ children }) {
  const [authState, dispatch] = useReducer(authReducer, {
    logged: typeof window !== 'undefined' ?
      (localStorage.getItem(btoa('logged')) ? atob(localStorage.getItem(btoa('logged'))) : '') : '',
    addresses: typeof window !== 'undefined' ?
      (localStorage.getItem(btoa('addresses')) ? fromBinary(localStorage.getItem(btoa('addresses'))) : '') : '',
    name: typeof window !== 'undefined' ?
      (localStorage.getItem(btoa('name')) ? atob(localStorage.getItem(btoa('name'))) : '') : ''
  });

  const login = () => {
    dispatch({ type: LOGIN, logged: true });
  };

  const logout = () => {
    dispatch({ type: LOGOUT, logged: false });
  };

  const checkState = (isLogged) => {
    dispatch({ type: CHECK_STATE, logged: isLogged });
  };

  const loadDeliveryAddresses = (loadedAddresses) => {
    dispatch({ type: LOAD_DELIVERY_ADDRESSES, addresses: loadedAddresses });
  };

  const addDeliveryAddress = (address) => {
    dispatch({ type: ADD_DELIVERY_ADDRESS, address: address });
  };

  const removeDeliveryAddress = (id) => {
    dispatch({ type: REMOVE_DELIVERY_ADDRESS, id: id });
  };

  const clearAddressesList = () => {
    dispatch({ type: CLEAR_ADDRESSES });
  };

  const saveName = (name) => {
    dispatch({ type: SAVE_NAME, name: name });
  };

  return (
    <AuthContext.Provider
      value={{
        logged: authState.logged,
        addresses: authState.addresses,
        name: authState.name,
        login,
        logout,
        checkState,
        loadDeliveryAddresses,
        addDeliveryAddress,
        removeDeliveryAddress,
        clearAddressesList,
        saveName
      }}>
      {children}
    </AuthContext.Provider>
  );
}
