import React from 'react';
import { fromBinary } from '../../utils/base64encoder';

export default React.createContext({
  cart: typeof window !== 'undefined' ? (localStorage.getItem(btoa('cartItems')) ?
    JSON.parse(fromBinary(localStorage.getItem(btoa('cartItems')))) : [])
    : [],
  show: false,
  cartButtonClick: false,
  showCart: () => {
  },
  loadProducts: () => {
  },
  decreaseQuantity: () => {
  },
  increaseQuantity: () => {
  },
  addProductToCart: () => {
  },
  removeProductFromCart: () => {
  },
  clearCart: () => {
  }
});
