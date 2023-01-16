// регулярное выражение для проверки валидации ссылки
const urlRegExp = /https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\.\w{2,}(\/[1-90a-z-._~:?#[@!$&'()*+,;=]{1,}\/?)?#?/i;

module.exports = { urlRegExp };