import React, {useReducer} from 'react';
import AuthContext from './AuthContext';
import {authReducer} from './reducer';
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

export default function AuthState(props) {
  const logged = localStorage.getItem('logged') === 'true';
  const addresses = JSON.parse(localStorage.getItem('addresses'));
  const name = localStorage.getItem('name');

  const [authState, dispatch] = useReducer(authReducer, {logged: logged, addresses: addresses, name: name});

  const login = () => {
    dispatch({type: LOGIN, logged: true});
  };

  const logout = () => {
    dispatch({type: LOGOUT, logged: false});
  };

  const checkState = (isLogged) => {
    dispatch({type: CHECK_STATE, logged: isLogged});
  };

  const loadDeliveryAddresses = (loadedAddresses) => {
    dispatch({type: LOAD_DELIVERY_ADDRESSES, addresses: loadedAddresses});
  };

  const addDeliveryAddress = (address) => {
    dispatch({type: ADD_DELIVERY_ADDRESS, address: address});
  };

  const removeDeliveryAddress = (id) => {
    dispatch({type: REMOVE_DELIVERY_ADDRESS, id: id});
  };

  const clearAddressesList = () => {
    dispatch({type: CLEAR_ADDRESSES});
  };

  const saveName = (name) => {
    dispatch({type: SAVE_NAME, name: name});
  };

  return (
    <AuthContext.Provider
      value={{
        logged: authState.logged,
        addresses: authState.addresses,
        name: authState.name,
        login: login,
        logout: logout,
        checkState: checkState,
        loadDeliveryAddresses: loadDeliveryAddresses,
        addDeliveryAddress: addDeliveryAddress,
        removeDeliveryAddress: removeDeliveryAddress,
        clearAddressesList: clearAddressesList,
        saveName: saveName
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}