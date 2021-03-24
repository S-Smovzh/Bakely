export function login(state) {
  localStorage.setItem('logged', 'true');
  return {...state, logged: true};
}

export function logout(state) {
  localStorage.removeItem('logged');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('addresses');
  localStorage.removeItem('refreshTime');
  return {...state, logged: false};
}

export function checkState() {
  const logged = localStorage.getItem('logged') ? localStorage.getItem('logged') : false;
  return {logged: logged};
}

export function loadDeliveryAddresses(state) {
  return {...state, addresses: JSON.parse(localStorage.getItem('addresses'))};
}

export const addDeliveryAddress = (address, state) => {

  const updatedAddressList = localStorage.getItem('addresses') ? JSON.parse(localStorage.getItem('addresses')) : [];

  if (updatedAddressList.length > 0) {
    const isExisting = updatedAddressList.find((item) => {
      if (item.city === address.city && item.street === address.street && item.houseNum === address.houseNum && item.flatNum === address.flatNum) {
        return true;
      }
    });

    if (!isExisting) {
      if (updatedAddressList.length === 3) {
        updatedAddressList.pop();
      }
      updatedAddressList.unshift({...address});
    }
  } else {
    updatedAddressList.push(address);
  }

  localStorage.setItem('addresses', JSON.stringify(updatedAddressList));

  return {...state, addresses: updatedAddressList};
};

export const removeDeliveryAddress = (id, state) => {
  const updatedAddressList = state.addresses ? [...state.addresses] : [];

  const index = updatedAddressList.findIndex((item) => item.id === id);
  updatedAddressList.splice(index, 1);

  localStorage.setItem('addresses', JSON.stringify(updatedAddressList));

  return {...state, addresses: updatedAddressList};
};

export const clearAddressesList = (state) => {
  return {...state, addresses: []};
};

export const saveName = (name, state) => {
  localStorage.setItem('name', name);
  return {...state, name: name};
};