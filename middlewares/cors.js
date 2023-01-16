// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://sigvad-movies.nomoredomains.club',
  'https://sigvad-movies.nomoredomains.club',
  'http://localhost:3001',
  'https://localhost:3001',
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { method } = req; // тип запроса (HTTP-метод)
  const { origin } = req.headers; // источник запроса
  const requestHeaders = req.headers['access-control-request-headers']; // список заголовков запроса

  // заголовок, который разрешает браузеру запросы из любого источника
  // res.header('Access-Control-Allow-Origin', '*');

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // разрешаем браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
};

module.exports = { cors };
