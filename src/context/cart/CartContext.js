import React from "react";

export default React.createContext({
  cart: localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems'))
    : [],
  show: false,
  showCart: (show) => {
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
