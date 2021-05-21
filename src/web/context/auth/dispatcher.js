import { fromBinary, toBinary } from '../../utils/base64encoder';

export function login(state) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(btoa('logged'), btoa('true'));

    return { ...state, logged: true };
  }
}

export function logout(state) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(btoa('logged'));
    localStorage.removeItem(btoa('token'));
    localStorage.removeItem(btoa('refreshToken'));
    localStorage.removeItem(btoa('addresses'));
    localStorage.removeItem(btoa('refreshTime'));
    return { ...state, logged: false };
  }
}

export function checkState() {
  if (typeof window !== 'undefined') {
    const logged = localStorage.getItem(btoa('logged')) ? atob(localStorage.getItem(btoa('logged'))) : false;

    return { logged: logged };
  }
}

export function loadDeliveryAddresses(state) {
  if (typeof window !== 'undefined') {
    return {
      ...state, addresses: localStorage.getItem(btoa('addresses')) ?
        JSON.parse(fromBinary(localStorage.getItem(btoa('addresses'))))
        : []
    };
  }
}

export function addDeliveryAddress(address, state) {
  if (typeof window !== 'undefined') {
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
  }
}

export function removeDeliveryAddress(id, state) {
  if (typeof window !== 'undefined') {
    const updatedAddressList = state.addresses ? [ ...state.addresses ] : [];

    const index = updatedAddressList.findIndex((item) => item.id === id);

    updatedAddressList.splice(index, 1);

    localStorage.setItem(btoa('addresses'), toBinary(JSON.stringify(updatedAddressList)));

    return { ...state, addresses: updatedAddressList };
  }
}

export function clearAddressesList(state) {
  return { ...state, addresses: [] };
}

export function saveName(name, state) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(btoa('name'), btoa(name));
    return { ...state, name: name };
  }
}
