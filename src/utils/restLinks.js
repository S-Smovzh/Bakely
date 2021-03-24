export const publicLinks = {
  careers: (language) => {
    return `http://localhost:5000/api/${language}/vacancies/all`
  },
  bakeries: (language) => {
    return `http://localhost:5000/api/${language}/bakeries/all`
  },
  cateringGallery: (language) => {
    return `http://localhost:5000/api/${language}/catering/all`
  },
  weddings: (language) => {
    return `http://localhost:5000/api/${language}/catering/type/wedding`
  },
  celebrations: (language) => {
    return `http://localhost:5000/api/${language}/catering/type/celebration`
  },
  corporates: (language) => {
    return `http://localhost:5000/api/${language}/catering/type/corporate`
  },
  cateringFeedbacks: (language, eventId) => {
    return `http://localhost:5000/api/${language}/catering/feedback/${eventId}`
  },
  articles: (language) => {
    return `http://localhost:5000/api/${language}/press/all`
  },
  pressRelease: (language, id) => {
    return `http://localhost:5000/api/${language}/press/id/${id}`
  },
  availableCities: (language) => {
    return `http://localhost:5000/api/${language}/available-cities/all`
  },
  productsCategories: (language) => {
    return `http://localhost:5000/api/${language}/products/categories`
  },
  productsByCategory: (language, type) => {
    return `http://localhost:5000/api/${language}/products/type/${type}/all`
  },
  productsById: (language, id) => {
    return `http://localhost:5000/api/${language}/products/id/${id}`
  },
  ingredientsByproductId: (language, id) => {
    return `http://localhost:5000/api/${language}/ingredients/id/${id}`
  },
  similarProducts: (language, type, id) => {
    return `http://localhost:5000/api/${language}/products/similar/${type}/${id}`
  },
};

export const clientLinks = {
  cart: 'http://localhost:5000/api/protected/client/auth/order/proceed',
  contactUs: 'http://localhost:5000/api/protected/client/auth/contact',
  order: 'http://localhost:5000/api/protected/client/auth/add-contact-data',
  addDeliveryAddress: 'http://localhost:5000/api/protected/client/auth/add-delivery-address',

};

export const userLinks = {
  cart: 'http://localhost:5000/api/protected/user/auth/order/proceed',
  contactUs: 'http://localhost:5000/api/protected/client/auth/contact',
  addDeliveryAddress: 'http://localhost:5000/api/protected/user/auth/addresses/add',
  validate: 'http://localhost:5000/api/protected/user/auth/validate',
  login: 'http://localhost:5000/api/protected/user/auth/login',
  register: 'http://localhost:5000/api/protected/user/auth/register',

};