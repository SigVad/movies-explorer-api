const router = require('express').Router();
const { updateUserValidator } = require('../middlewares/validations');
const { getCurrentUser, updateUser } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateUserValidator, updateUser);

module.exports = router;
