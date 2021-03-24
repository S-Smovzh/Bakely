import React, {useReducer} from 'react';
import CartContext from './CartContext';
import {
  ADD_PRODUCT,
  CLEAR_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  LOAD_PRODUCTS,
  REMOVE_PRODUCT, SHOW_CART
} from './actionTypes';
import {cartReducer} from './reducer';

export default function CartState(props) {
  const cart = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems'))
    : [];

  const [cartState, dispatch] = useReducer(cartReducer, {cart: cart, show: false});

  const showCart = (show) => {
    dispatch({type: SHOW_CART, show: show});
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
        showCart: showCart,
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