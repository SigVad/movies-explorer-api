const {
  PORT = 3000,
  URL_DATABASE = 'mongodb://localhost:27017/moviesdb',
} = process.env; //для разработки

// регулярное выражение для проверки валидации ссылки
const urlRegExp = /https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\.\w{2,}(\/[1-90a-z-._~:?#[@!$&'()*+,;=]{1,}\/?)?#?/i;

module.exports = { PORT, URL_DATABASE, urlRegExp };
