const { validationResult } = require('express-validator'); //validaciones
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const sequelize = require('../utils/database');

exports.loguear = async (req, res, next) => {
    try {
        const errors = await validationResult(req); //validaciones
        if (!errors.isEmpty()) {
            const error = new Error('Datos ingresados incorrectos..!');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const password = req.body.password;
        const mail1 = req.body.mail1;
        let loadedUser;
        await Usuario.findOne({
            where: {
                MAIL1: mail1
            }
        })
        .then(user => {
            if (!user) {
                const error = new Error('Usuario no encontrado..!');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.PASSWORD);
        })
        .then(isEqual => {
            if(!isEqual) {
                const error = new Error('Datos ingresados erróneos..!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                userId: loadedUser.ID_USUARIO.toString(),
                email: loadedUser.MAIL1
            }, 
            process.env.SECRET_JWT,
            { expiresIn: process.env.EXPIRESIN });
            res.status(200).json({ token: token, userId: loadedUser.ID_USUARIO.toString(), expiraEn: process.env.EXPIRESIN });
        })
        .catch(err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
                err.message = 'Ocurrió un error al Loguear..!   ' + err;
            }
            throw err;
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Ocurrió un error al crear el usuario..!   ' + err;
        }
        next(err);
    }
};