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
const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    // режиссёр
    director: Joi.string().required(),
    // длительность
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    // постер
    image: Joi.string().required().regex(urlRegExp),
    trailerLink: Joi.string().required().regex(urlRegExp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
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
const updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  createMovieValidator,
  deleteMovieValidator,
  updateUserValidator,
};
