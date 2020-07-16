const express = require('express');
const { body } = require('express-validator');

const Usuario = require('../models/usuario');
const autorizarController = require('../controllers/autorizar');

const router = express.Router();

//POST /autorizar/loguear
router.post('/loguear', [
    body('mail1')
        .isEmail()
        .withMessage('Favor ingrese un mail válido..!')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8})
        .withMessage('El ancho del password debe ser mínimo 8 caracteres..!')
], autorizarController.loguear);

module.exports = router;