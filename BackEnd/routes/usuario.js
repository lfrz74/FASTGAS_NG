const express = require('express');

const { body } = require('express-validator'); //npm install --save express-validator

const usuarioController = require('../controllers/usuario');

const router = express.Router();
//GET /usuario/consultar
router.get('/consultar', usuarioController.consultarUsuario);

//GET /usuario/consultar/1
router.get('/consultar/:usuarioId', usuarioController.consultarUsuarioPorId);

//POST /usuario/crear   validaciones
router.post('/crear', [
    body('codigo').trim().isLength({min: 5}),
    body('nombre1').trim().isLength({min: 2})
], usuarioController.crearUsuario);

//PUT /usuario/actualizar/7
router.put('/actualizar/:usuarioId', usuarioController.actualizarUsuario);

//DELETE /usuario/eliminar/6
router.delete('/eliminar/:usuarioId', usuarioController.eliminarUsuario);

module.exports = router;