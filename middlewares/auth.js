const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

// мидлвэр для авторизации
const auth = (req, res, next) => {
  const secretKey = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-code';
  const token = req.cookies.access_token;
  console.log(req.cookies);
  if (!token) {
    next(new UnauthorizedErr('Необходима авторизация')); // 401
    return;
  }
  let payload;

  try {
    // верифицировать токен из кук
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }
  // добавить пейлоуд токена в объект запроса
  req.user = payload;
  next();
};
module.exports = { auth };
