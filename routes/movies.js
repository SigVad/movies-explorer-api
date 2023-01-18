const router = require('express').Router();
const { addMovieValidator, deleteMovieValidator } = require('../middlewares/validations');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм
router.post('/movies', addMovieValidator, addMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
