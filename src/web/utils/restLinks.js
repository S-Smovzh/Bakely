const REST_API = 'https://bakely-back.herokuapp.com/api';

export const publicLinks = {
  articles: (language) => `${REST_API}/${language}/press/all`,
  availableCities: (language) => `${REST_API}/${language}/available-cities/all`,
  bakeries: (language) => `${REST_API}/${language}/bakeries/all`,
  cateringGallery: (language) => `${REST_API}/${language}/catering/all`,
  cateringFeedbacks: (language, eventId) => `${REST_API}/${language}/catering/feedback/${eventId}`,
  celebrations: (language) => `${REST_API}/${language}/catering/type/celebration`,
  corporates: (language) => `${REST_API}/${language}/catering/type/corporate`,
  ingredientsByproductId: (language, id) => `${REST_API}/${language}/ingredients/id/${id}`,
  pressRelease: (language, id) => `${REST_API}/${language}/press/id/${id}`,
  productsByCategory: (language, type) => `${REST_API}/${language}/products/type/${type}/all`,
  productsById: (language, id) => `${REST_API}/${language}/products/id/${id}`,
  productsCategories: (language) => `${REST_API}/${language}/products/categories`,
  similarProducts: (language, type, id) => `${REST_API}/${language}/products/similar/${type}/${id}`,
  weddings: (language) => `${REST_API}/${language}/catering/type/wedding`
};

export const clientLinks = {
  analytics: `${REST_API}/analytics`,
  addDeliveryAddress: `${REST_API}/protected/client/auth/add-delivery-address`,
  cart: `${REST_API}/protected/client/auth/order/proceed`,
  createSession: `${REST_API}/protected/client/auth/create-session`,
  contactUs: `${REST_API}/protected/client/auth/contact`,
  order: `${REST_API}/protected/client/auth/add-contact-data`,
  subscribe: `${REST_API}/protected/client/auth/subscribe`
};

export const userLinks = {
  addDeliveryAddress: `${REST_API}/protected/user/auth/addresses/add`,
  cart: `${REST_API}/protected/user/auth/order/proceed`,
  changeEmail: `${REST_API}/protected/user/auth/change-email`,
  changePassword: `${REST_API}/protected/user/auth/change-password`,
  changeTelNum: `${REST_API}/protected/user/auth/change-tel-num`,
  contactUs: `${REST_API}/protected/user/auth/contact`,
  deliveryAddresses: `${REST_API}/protected/user/auth/addresses/all`,
  deleteDeliveryAddress: (id) => `${REST_API}/protected/user/auth/addresses/delete/${id}`,
  searchOrder: (keyword) => `${REST_API}/protected/user/auth/order/${keyword}`,
  error: `${REST_API}/protected/user/auth/error/`,
  login: `${REST_API}/protected/user/auth/login`,
  refresh: `${REST_API}/protected/user/auth/refresh`,
  register: `${REST_API}/protected/user/auth/register`,
  orders: (language) => `${REST_API}/protected/user/auth/${language}/order/all`,
  validate: `${REST_API}/protected/user/auth/validate`
};
