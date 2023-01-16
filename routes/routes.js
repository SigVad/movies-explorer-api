const router = require('express').Router();
const { errors } = require('celebrate');
const usersRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const NotFoundErr = require('../errors/NotFoundErr');
const { auth } = require('../middlewares/auth');
const defaultError = require('../middlewares/defaultError');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { createUserValidator, loginValidator } = require('../middlewares/validations');

router.use(requestLogger); // подключаем логгер запросов
// создаёт пользователя [email password name]
routes.post('/signup', createUserValidator, createUser);
// проверяет переданные [email password] и возвращает JWT
routes.post('/signin', loginValidator, login);

router.use(auth); // защита авторизацией
router.use('/', usersRouter);
router.use('/', movieRouter);
//  удалится JWT из куков пользователя
router.post('/signout', (req, res) => {
  res.clearCookie('access_token').send({ message: 'Выход' });
});

router.use('*', (req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

router.use(errorLogger); // подключаем логгер ошибок
router.use(errors()); // обработчик ошибок celebrate
router.use(defaultError); // обработать ошибку сервера

module.exports = router;
