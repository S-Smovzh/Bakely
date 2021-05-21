export const publicLinks = {
  articles: (language) => `${process.env.REST_API}/${language}/press/all`,
  availableCities: (language) => `${process.env.REST_API}/${language}/available-cities/all`,
  bakeries: (language) => `${process.env.REST_API}/${language}/bakeries/all`,
  cateringGallery: (language) => `${process.env.REST_API}/${language}/catering/all`,
  cateringFeedbacks: (language, eventId) => `${process.env.REST_API}/${language}/catering/feedback/${eventId}`,
  celebrations: (language) => `${process.env.REST_API}/${language}/catering/type/celebration`,
  corporates: (language) => `${process.env.REST_API}/${language}/catering/type/corporate`,
  ingredientsByproductId: (language, id) => `${process.env.REST_API}/${language}/ingredients/id/${id}`,
  pressRelease: (language, id) => `${process.env.REST_API}/${language}/press/id/${id}`,
  productsByCategory: (language, type) => `${process.env.REST_API}/${language}/products/type/${type}/all`,
  productsById: (language, id) => `${process.env.REST_API}/${language}/products/id/${id}`,
  productsCategories: (language) => `${process.env.REST_API}/${language}/products/categories`,
  similarProducts: (language, type, id) => `${process.env.REST_API}/${language}/products/similar/${type}/${id}`,
  weddings: (language) => `${process.env.REST_API}/${language}/catering/type/wedding`
};

export const clientLinks = {
  analytics: `${process.env.REST_API}/analytics`,
  addDeliveryAddress: `${process.env.REST_API}/protected/client/auth/add-delivery-address`,
  cart: `${process.env.REST_API}/protected/client/auth/order/proceed`,
  createSession: `${process.env.REST_API}/protected/client/auth/create-session`,
  contactUs: `${process.env.REST_API}/protected/client/auth/contact`,
  order: `${process.env.REST_API}/protected/client/auth/add-contact-data`,
  subscribe: `${process.env.REST_API}/protected/client/auth/subscribe`
};

export const userLinks = {
  addDeliveryAddress: `${process.env.REST_API}/protected/user/auth/addresses/add`,
  cart: `${process.env.REST_API}/protected/user/auth/order/proceed`,
  changeEmail: `${process.env.REST_API}/protected/user/auth/change-email`,
  changePassword: `${process.env.REST_API}/protected/user/auth/change-password`,
  changeTelNum: `${process.env.REST_API}/protected/user/auth/change-tel-num`,
  contactUs: `${process.env.REST_API}/protected/user/auth/contact`,
  deliveryAddresses: `${process.env.REST_API}/protected/user/auth/addresses/all`,
  deleteDeliveryAddress: (id) => `${process.env.REST_API}/protected/user/auth/addresses/delete/${id}`,
  searchOrder: (keyword) => `${process.env.REST_API}/protected/user/auth/order/${keyword}`,
  error: `${process.env.REST_API}/protected/user/auth/error/`,
  login: `${process.env.REST_API}/protected/user/auth/login`,
  refresh: `${process.env.REST_API}/protected/user/auth/refresh`,
  register: `${process.env.REST_API}/protected/user/auth/register`,
  orders: (language) => `${process.env.REST_API}/protected/user/auth/${language}/order/all`,
  validate: `${process.env.REST_API}/protected/user/auth/validate`
};
