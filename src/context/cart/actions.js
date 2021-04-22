import {
  LOAD_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
  SHOW_CART,
  CART_BUTTON_CLICKED
} from './actionTypes';

export const showCart = (show) => ({
  type: SHOW_CART,
  show: show
});

export const cartButtonInteraction = (cartButtonClick) => ({
  type: CART_BUTTON_CLICKED,
  cartButtonClick: cartButtonClick
});


export const loadProducts = () => ({
  type: LOAD_PRODUCTS
});

export const decreaseQuantity = product => ({
  type: DECREASE_QUANTITY,
  payload: product
});

export const increaseQuantity = product => ({
  type: INCREASE_QUANTITY,
  payload: product
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const clearCart = () => ({
  type: CLEAR_CART
});
