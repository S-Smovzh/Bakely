import {
  LOAD_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  CLEAR_CART, SHOW_CART
} from './actionTypes';
import {
  addProductToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  loadProducts,
  removeProductFromCart
} from './dispatcher';
import {showCart} from "./actions";

const initialState = {
  show: false,
  products: localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems'))
    : []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CART:
      return showCart(action.show, state);
    case LOAD_PRODUCTS:
      return loadProducts(state);
    case DECREASE_QUANTITY:
      return decreaseQuantity(action.product, state);
    case INCREASE_QUANTITY:
      return increaseQuantity(action.product, state);
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.product, state);
    case CLEAR_CART:
      return clearCart(state);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};