import React from "react";
import {fromBinary} from "../../utils/base64encoder";

export default React.createContext({
  cart: localStorage.getItem(btoa('cartItems')) ?
    JSON.parse(fromBinary(localStorage.getItem(btoa('cartItems'))))
    : [],
  show: false,
  cartButtonClick: false,
  showCart: (show) => {
  },
  cartButtonInteraction: (cartButtonClick) => {
  },
  loadProducts: () => {
  },
  decreaseQuantity: (product) => {
  },
  increaseQuantity: (product) => {
  },
  addProductToCart: (product) => {
  },
  removeProductFromCart: (product) => {
  },
  clearCart: () => {
  }
});
