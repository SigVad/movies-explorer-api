const router = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validations');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм
router.post('/movies', createMovieValidator, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
