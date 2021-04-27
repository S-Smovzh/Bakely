import {fromBinary, toBinary} from "../../utils/base64encoder";

export const showCart = (show, state) => {
  return {...state, show: show};
};

export const cartButtonInteraction = (cartButtonClick, state) => {
  return {...state, cartButtonClick: cartButtonClick};
};

export const addProductToCart = (product, state) => {

  let tempMap = new Map([]);
  const options = product.options;
  const maxPerOrder = product.maxPerOrder;
  for (let i = 0; i < options.length; i++) {
    tempMap.set(options[i], maxPerOrder[i]);
  }

  const productData = {
    productId: product.id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    quantity: product.quantity,
    selectedOption: product.selectedOption,
    maxPerOrder: Array.from(tempMap),
    total: product.total,
    imgSrc: product.imgSrc,
    imgDescription: product.imgDescription
  };

  let updatedItemIndex;

  const updatedCart = state.cart ? [...state.cart] : [];

  let updatedItem = updatedCart.find((item) => {
    if (item.productId === productData.productId && item.selectedOption === productData.selectedOption) {
      updatedItemIndex = updatedCart.indexOf(item);
      return item.productId === productData.productId;
    }
  });

  if (updatedItem) {
    const maximum = new Map(productData.maxPerOrder).get(productData.selectedOption);
    if (updatedItem.quantity + productData.quantity < maximum) {
      updatedItem.quantity += productData.quantity;
    } else {
      updatedItem.quantity = maximum;
    }
    updatedItem.total = updatedItem.price * (100 - updatedItem.discount) / 100 * updatedItem.selectedOption.split(' ')[0] * updatedItem.quantity;
    updatedCart[updatedItemIndex] = updatedItem;
  } else {
    updatedCart.push({...productData});
  }

  localStorage.setItem(btoa('cartItems'), toBinary(JSON.stringify(updatedCart)));

  return {...state, cart: updatedCart};
};

export const removeProductFromCart = (product, state) => {

  let updatedItemIndex;

  const updatedCart = state.cart ? [...state.cart] : [];

  updatedCart.find((item) => {
    if (item.productId === product.productId && item.selectedOption === product.selectedOption) {
      updatedItemIndex = updatedCart.indexOf(item);
    }
  });

  updatedCart.splice(updatedItemIndex, 1);

  localStorage.setItem(btoa('cartItems'), toBinary(JSON.stringify(updatedCart)));

  return {...state, cart: updatedCart};
};

export const decreaseQuantity = (product, state) => {

  let updatedItemIndex;

  const updatedCart = state.cart ? [...state.cart] : [];

  let updatedItem = updatedCart.find((item) => {
    if (item.productId === product.productId && item.selectedOption === product.selectedOption) {
      updatedItemIndex = updatedCart.indexOf(item);
      return item.productId === product.productId;
    }
  });

  if (updatedItem.quantity > 1) {
    updatedItem.quantity--;
  }

  updatedItem.total = updatedItem.price * (100 - updatedItem.discount) / 100 * updatedItem.selectedOption.split(' ')[0] * updatedItem.quantity;

  updatedCart[updatedItemIndex] = updatedItem;

  localStorage.setItem(btoa('cartItems'), toBinary(JSON.stringify(updatedCart)));
  return {...state, cart: updatedCart};
};

export const increaseQuantity = (product, state) => {

  let updatedItemIndex;

  const updatedCart = state.cart ? [...state.cart] : [];

  let updatedItem = updatedCart.find((item) => {
    if (item.productId === product.productId && item.selectedOption === product.selectedOption) {
      updatedItemIndex = updatedCart.indexOf(item);
      return item.productId === product.productId;
    }
  });

  const maximum = new Map(updatedItem.maxPerOrder).get(updatedItem.selectedOption);

  if (updatedItem.quantity < maximum) {
    updatedItem.quantity++;
  }

  updatedItem.total = updatedItem.price * (100 - updatedItem.discount) / 100 * updatedItem.selectedOption.split(' ')[0] * updatedItem.quantity;

  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  localStorage.setItem(btoa('cartItems'), toBinary(JSON.stringify(updatedCart)));
  return {...state, cart: updatedCart};
};

export const loadProducts = (state) => {
  const loadedCart = localStorage.getItem(btoa('cartItems')) ?
    JSON.parse(fromBinary(localStorage.getItem(btoa('cartItems'))))
    : [];
  return {...state, cart: loadedCart};
};

export const clearCart = (state) => {
  localStorage.removeItem(btoa('cartItems'));
  return {...state, cart: []};
};
