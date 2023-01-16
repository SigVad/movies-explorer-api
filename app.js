const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Сборка пакетов
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const { cors } = require('./middlewares/cors');
const { PORT, URL_DATABASE } = require('./utils/constants');

const app = express();

app.use(cors);
// для собирания JSON-формата
app.use(bodyParser.json());
// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect(URL_DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  autoIndex: true,
});

app.use(routes); // маршруты

app.listen(PORT);
