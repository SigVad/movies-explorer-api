const router = require('express').Router();
const { userInfoValidator } = require('../middlewares/validations');
const { getCurrentUser, userInfo } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', userInfoValidator, userInfo);

module.exports = router;
