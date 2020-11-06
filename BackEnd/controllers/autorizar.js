const { validationResult } = require('express-validator'); //validaciones
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const sequelize = require('../utils/database');

const crypt = require('../services/crypto');
const axio = require('axios');
const { response } = require('express');

//Método para validar las credenciales del usuario y devolver el token de validación
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
            res.status(202).json({ token: token, userId: loadedUser.ID_USUARIO.toString(), expiraEn: process.env.EXPIRESIN });
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
//Método para validar si los tokens almacenados en el localstorage de los clientes es válido
exports.validarTokenFirebase = async (req, res, next) => {
    try {
        const headerToken = req.body.tokenf;
        const uuid = req.body.uid;
        const mail1 = req.body.mail1;
        if (!headerToken) {
            const error = new Error('No se envió el token de validación..!');
            error.statusCode = 401;
            error.data = errors.array();
            throw error;
        } 
        //Busco que exista el usuario en la bdd
        let loadedUser;
        await Usuario.findOne({
            where: {
                [Op.or]: [
                  { MAIL1: mail1 },
                  { MAIL2: mail1 }
                ]
            }            
        })
        .then(user => {
            if (!user) {
                const error = new Error('Usuario no registrado. Favor registrarse primero..!');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
        })
        .catch(err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
                err.message = 'Ocurrió un error al validar el token 1..!   ' + err;
            }
            throw err;
        });
        //Refresh token comes from the client app
        await axio.post(process.env.URL_FIREBASE_TOKEN.concat(process.env.FIREBASECONFIG_APIKEY), {
            grant_type: 'refresh_token',
            refresh_token: crypt.convertText('decrypt', headerToken)
        })
        .then((decodedToken) => {
            let uid = decodedToken.data.user_id;
            if (crypt.convertText('decrypt', uuid) !== uid) {
                const error = new Error('Usuario no autorizado..!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                userId: loadedUser.ID_USUARIO.toString(),
                email: loadedUser.MAIL1
            }, 
            process.env.SECRET_JWT,
            { expiresIn: process.env.EXPIRESIN });
            res.status(202).json({ token: token, userId: loadedUser.ID_USUARIO.toString(), expiraEn: process.env.EXPIRESIN });
        })
        .catch(err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
                err.message = 'Ocurrió un error al validar el token 2..!   ' + err;
            }
            throw err;
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Ocurrió un error al validar el token 3..!   ' + err;
        }
        next(err);
    }
};
