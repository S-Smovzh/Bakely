import { fromBinary, toBinary } from '../../utils/base64encoder';

export function login(state) {
  localStorage.setItem(btoa('logged'), btoa('true'));
  return { ...state, logged: true };
}

export function logout(state) {
  localStorage.removeItem(btoa('logged'));
  localStorage.removeItem(btoa('token'));
  localStorage.removeItem(btoa('refreshToken'));
  localStorage.removeItem(btoa('addresses'));
  localStorage.removeItem(btoa('refreshTime'));
  return { ...state, logged: false };
}

export function checkState() {
  const logged = localStorage.getItem(btoa('logged')) ? atob(localStorage.getItem(btoa('logged'))) : false;

  return { logged: logged };
}

export function loadDeliveryAddresses(state) {
  return { ...state, addresses: localStorage.getItem(btoa('addresses')) ?
      JSON.parse(fromBinary(localStorage.getItem(btoa('addresses'))))
      : [] };
}

export const addDeliveryAddress = (address, state) => {
  const updatedAddressList = localStorage.getItem(btoa('addresses'))
    ? JSON.parse(fromBinary(localStorage.getItem(btoa('addresses'))))
    : [];

  if (updatedAddressList.length > 0) {
    const isExisting = updatedAddressList.find((item) => {
      if (item.city === address.city
        && item.street === address.street
        && item.houseNum === address.houseNum
        && item.flatNum === address.flatNum) {
        return true;
      }
    });

    if (!isExisting) {
      if (updatedAddressList.length === 3) {
        updatedAddressList.pop();
      }
      updatedAddressList.unshift({ ...address });
    }
  } else {
    updatedAddressList.push(address);
  }

  localStorage.setItem(btoa('addresses'), toBinary(JSON.stringify(updatedAddressList)));

  return { ...state, addresses: updatedAddressList };
};

export const removeDeliveryAddress = (id, state) => {
  const updatedAddressList = state.addresses ? [ ...state.addresses ] : [];

  const index = updatedAddressList.findIndex((item) => item.id === id);

  updatedAddressList.splice(index, 1);

  localStorage.setItem(btoa('addresses'), toBinary(JSON.stringify(updatedAddressList)));

  return { ...state, addresses: updatedAddressList };
};

export const clearAddressesList = (state) => {
  return { ...state, addresses: [] };
};

export const saveName = (name, state) => {
  localStorage.setItem(btoa('name'), btoa(name));
  return { ...state, name: name };
};
