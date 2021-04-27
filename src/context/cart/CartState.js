import React, {useReducer} from 'react';
import CartContext from './CartContext';
import {
  ADD_PRODUCT, CART_BUTTON_CLICKED,
  CLEAR_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  LOAD_PRODUCTS,
  REMOVE_PRODUCT, SHOW_CART
} from './actionTypes';
import {cartReducer} from './reducer';
import {fromBinary} from "../../utils/base64encoder";

export default function CartState(props) {
  const cart = localStorage.getItem(btoa('cartItems')) ?
    JSON.parse(fromBinary(localStorage.getItem(btoa('cartItems'))))
    : [];

  const [cartState, dispatch] = useReducer(cartReducer, {cart: cart, show: false, cartButtonClick: false});

  const showCart = (show) => {
    dispatch({type: SHOW_CART, show: show});
  };

  const cartButtonInteraction = (cartButtonClick) => {
    dispatch({type: CART_BUTTON_CLICKED, cartButtonClick: cartButtonClick});
  };

  const loadProducts = (loadedProducts) => {
    dispatch({type: LOAD_PRODUCTS, cart: loadedProducts});
  };

  const decreaseQuantity = (product) => {
    dispatch({type: DECREASE_QUANTITY, product: product});
  };

  const increaseQuantity = (product) => {
    dispatch({type: INCREASE_QUANTITY, product: product});
  };

  const addProductToCart = (product) => {
    dispatch({type: ADD_PRODUCT, product: product});
  };

  const removeProductFromCart = (product) => {
    dispatch({type: REMOVE_PRODUCT, product: product});
  };

  const clearCart = () => {
    dispatch({type: CLEAR_CART});
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        show: cartState.show,
        cartButtonClick: cartState.cartButtonClick,
        showCart: showCart,
        cartButtonInteraction: cartButtonInteraction,
        loadProducts: loadProducts,
        decreaseQuantity: decreaseQuantity,
        increaseQuantity: increaseQuantity,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        clearCart: clearCart
      }}>
      {props.children}
    </CartContext.Provider>
  );
}
