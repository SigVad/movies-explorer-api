const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

// post '/signup'
const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// post '/signin'
const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

// post '/movies'
const addMovieValidator = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    director: Joi.string().required(), // режиссёр
    country: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(), // длительность
    description: Joi.string().required(),
    trailerLink: Joi.string().required().regex(urlRegExp),
    image: Joi.string().required().regex(urlRegExp), // постер
    // минипостер
    thumbnail: Joi.string().required().regex(urlRegExp),
    movieId: Joi.number().required(),
  }),
});

// delete '/movies/:movieId'
const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

// patch '/users/me'
const userInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  addMovieValidator,
  deleteMovieValidator,
  userInfoValidator,
};
