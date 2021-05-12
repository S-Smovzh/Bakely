export const publicLinks = {
  careers: (language) => `http://localhost:5000/api/${language}/vacancies/all`,
  bakeries: (language) => `http://localhost:5000/api/${language}/bakeries/all`,
  cateringGallery: (language) => `http://localhost:5000/api/${language}/catering/all`,
  weddings: (language) => `http://localhost:5000/api/${language}/catering/type/wedding`,
  celebrations: (language) => `http://localhost:5000/api/${language}/catering/type/celebration`,
  corporates: (language) => `http://localhost:5000/api/${language}/catering/type/corporate`,
  cateringFeedbacks: (language, eventId) => `http://localhost:5000/api/${language}/catering/feedback/${eventId}`,
  articles: (language) => `http://localhost:5000/api/${language}/press/all`,
  pressRelease: (language, id) => `http://localhost:5000/api/${language}/press/id/${id}`,
  availableCities: (language) => `http://localhost:5000/api/${language}/available-cities/all`,
  productsCategories: (language) => `http://localhost:5000/api/${language}/products/categories`,
  productsByCategory: (language, type) => `http://localhost:5000/api/${language}/products/type/${type}/all`,
  productsById: (language, id) => `http://localhost:5000/api/${language}/products/id/${id}`,
  ingredientsByproductId: (language, id) => `http://localhost:5000/api/${language}/ingredients/id/${id}`,
  similarProducts: (language, type, id) => `http://localhost:5000/api/${language}/products/similar/${type}/${id}`
};

export const clientLinks = {
  addDeliveryAddress: 'http://localhost:5000/api/protected/client/auth/add-delivery-address',
  cart: 'http://localhost:5000/api/protected/client/auth/order/proceed',
  contactUs: 'http://localhost:5000/api/protected/client/auth/contact',
  order: 'http://localhost:5000/api/protected/client/auth/add-contact-data',
  subscribe: 'http://localhost:5000/api/protected/client/auth/subscribe'
};

export const userLinks = {
  error: 'http://localhost:5000/api/protected/user/error/',
  cart: 'http://localhost:5000/api/protected/user/auth/order/proceed',
  contactUs: 'http://localhost:5000/api/protected/client/auth/contact',
  addDeliveryAddress: 'http://localhost:5000/api/protected/user/auth/addresses/add',
  validate: 'http://localhost:5000/api/protected/user/auth/validate',
  login: 'http://localhost:5000/api/protected/user/auth/login',
  register: 'http://localhost:5000/api/protected/user/auth/register',
  orders: (language) => `http://localhost:5000/api/protected/user/auth/${language}/order/all`,
  addAddress: 'http://localhost:5000/api/protected/user/auth/addresses/add',
  deliveryAddresses: 'http://localhost:5000/api/protected/user/auth/addresses/all',
  deleteDeliveryAddress: (id) => `http://localhost:5000/api/protected/user/auth/addresses/delete/${id}`,
  changePassword: 'http://localhost:5000/api/protected/user/auth/change-password',
  changeEmail: 'http://localhost:5000/api/protected/user/auth/change-email',
  changeTelNum: 'http://localhost:5000/api/protected/user/auth/change-tel-num',
  searchOrder: (keyword) => `http://localhost:5000/api/protected/user/auth/order/${keyword}`
};
