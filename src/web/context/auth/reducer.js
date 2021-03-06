import { fromBinary } from '../../utils/base64encoder';
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
import {
  login,
  logout,
  checkState,
  removeDeliveryAddress,
  addDeliveryAddress,
  clearAddressesList,
  saveName,
  loadDeliveryAddresses
} from './dispatcher';

const initialState = {
  logged: typeof window !== 'undefined' ?
    (localStorage.getItem(btoa('logged')) ? atob(localStorage.getItem(btoa('logged'))) : '') : '',
  addresses: typeof window !== 'undefined' ?
    (localStorage.getItem(btoa('addresses')) ? fromBinary(localStorage.getItem(btoa('addresses'))) : '') : '',
  name: typeof window !== 'undefined' ?
    (localStorage.getItem(btoa('name')) ? atob(localStorage.getItem(btoa('name'))) : '') : ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return login(state);
    case LOGOUT:
      return logout(state);
    case CHECK_STATE:
      return checkState(state);
    case LOAD_DELIVERY_ADDRESSES:
      return loadDeliveryAddresses(state);
    case ADD_DELIVERY_ADDRESS:
      return addDeliveryAddress(action.address, state);
    case REMOVE_DELIVERY_ADDRESS:
      return removeDeliveryAddress(action.id, state);
    case CLEAR_ADDRESSES:
      return clearAddressesList(state);
    case SAVE_NAME:
      return saveName(action.name, state);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
