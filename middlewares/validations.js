const { celebrate, Joi } = require('celebrate');
const { httpRegex } = require('../utils/constants');

// '/signup'
const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// '/signin'
const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(httpRegex),
    trailerLink: Joi.string().required().regex(httpRegex),
    thumbnail: Joi.string().required().regex(httpRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserValidator, loginValidator, updateUserValidator, createMovieValidator, deleteMovieValidator,
};
