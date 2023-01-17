const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundErr = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ConflictErr = require('../errors/ConflictErr');

const getCurrentUser = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundErr('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email, _id = req.user._id } = req.body;
  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundErr('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') { // записываем в БД, проверка по схеме
        next(new BadRequestErr('Переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const secretKey = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-code';
      const token = jwt.sign(
        { _id: user._id },
        secretKey,
        { expiresIn: '7d' },
      );
      res
        .cookie('access_token', token, {
          maxAge: 604800000,
          httpOnly: true,
          secure: true,
          sameSite: false,
        })
        .send({ message: 'Аутентификация прошла успешно' });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userData = {
        name: user.name,
        email: user.email,
        _id: user._id,
      };
      res.send(userData);
    })
    .catch((err) => {
      // попытка создать дубликат уникального поля.
      if (err.code === 11000) {
        next(new ConflictErr('Пользователь уже существует'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser, updateUser, login, createUser,
};
