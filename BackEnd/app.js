const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

const usuarioRoutes = require('./routes/usuario');
const { Result } = require('express-validator');

const app = express();

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

//General Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json( { message: message });
});

//Sequelize
sequelize
  .sync()
  .then(result => {
    app.listen(7777);
  })
  .catch(err => {
    console.log(err);
  });



