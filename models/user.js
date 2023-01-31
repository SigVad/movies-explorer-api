const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

// схема Пользователи
const userSchema = new mongoose.Schema({
  email: { // почта пользователя для регистрации
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Некорректный Email',
    },
  },
  password: { // пароль (хеш)
    type: String,
    required: true,
    select: false, // чтобы API не возвращал хеш пароля
  },
  name: { // имя пользователя
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

function findUserByCredentialsFunc(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedErr('Некорректный Email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedErr('Некорректный Email или пароль');
          }
          return user;
        });
    });
}

// проверка почты на уровне схемы
userSchema.statics.findUserByCredentials = findUserByCredentialsFunc;

// модель
module.exports = mongoose.model('user', userSchema);
