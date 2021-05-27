const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const logger = require('morgan');

const sequelize = require('./utils/database');

const usuarioRoutes = require('./routes/usuario');
const autorizarRoutes = require('./routes/autorizar');

const { Result } = require('express-validator');

const app = express();

app.use(logger('dev')); //morgan
app.use(bodyParser.json()); //application/json

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Todo lo que comience con usuario será ruteado por aquí, tiene que estar la palabra completa no solo unas pocas letras ej: usuar
app.use('/usuario', usuarioRoutes);
app.use('/autorizar', autorizarRoutes);

//General Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json( { message: message, data: data });
});

if (process.env.NODE_ENV !== 'test') {
  app.use('/fastgasNG.swagger.io/v3', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(process.env.APP_PORT);
}

module.exports = app;