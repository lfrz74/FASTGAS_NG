const { validationResult } = require('express-validator'); //validaciones
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const lodash = require('lodash/mapValues');

const Usuario = require('../models/usuario');
const sequelize = require('../utils/database');

exports.consultarUsuario = async (req, res, next) => {
    await Usuario.findAll({
        order: [
            ['nombre1', 'ASC'],
            ['apellido1', 'ASC'],
        ]        
    })
    .then(users => {
        if (!users) {
            const error = new Error('No se encontraron usuarios..!');
            error.statusCode = 404;
            throw error;
        }
        let newObj = MapearUsuarioDTO(users);
        res.status(200).send({ usuarios: newObj });
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Error en consultarUsuario:  ' + err;
        }
        next(err);
    });

};

exports.consultarUsuarioPorId = async (req, res, next) => {
    const userId = req.params.usuarioId;
    await Usuario.findByPk(userId)
        .then(us => {
            if (!us) {
                const error = new Error('Usuario no encontrado..!');
                error.statusCode = 404;
                throw error;
            }
            let newObj = MapearUsuarioDTO(us);
            res.status(200).json({  user: newObj.dataValues });
        })
        .catch(err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
                err.message = 'Error en consultarUsuarioPorId:  ' + err;
            }
            next(err);
        });
};

exports.crearUsuario = async (req, res, next) => {
    try {
        const errors = await validationResult(req); //validaciones
        if (!errors.isEmpty()) {
            const error = new Error('Datos ingresados incorrectos..!');
            error.statusCode = 422;
            throw error;
        }
        const codigo = req.body.codigo;
        const origen = req.body.origen;
        const nombre1 = req.body.nombre1;
        const nombre2 = req.body.nombre2;
        const apellido1 = req.body.apellido1;
        const apellido2 = req.body.apellido2;
        const identificacion = req.body.identificacion;
        const tipo_identificacion = req.body.tipo_identificacion;
        const direccion_calle1 = req.body.direccion_calle1;
        const direccion_num = req.body.direccion_num;
        const direccion_calle2 = req.body.direccion_calle2;
        const telefono1 = req.body.telefono1;
        const telefono2 = req.body.telefono2;
        const telefono3 = req.body.telefono3;
        const password = req.body.password;
        const mail1 = req.body.mail1;
        const mail2 = req.body.mail2;
        const estado = req.body.estado; 
        const fecha_caducidad = req.body.fecha_caducidad;
        const pwdHash = bcrypt.hashSync(password, 12);
        const user1 = new Usuario({
            CODIGO: codigo,
            ORIGEN: origen,
            NOMBRE1: nombre1,
            NOMBRE2: nombre2,
            APELLIDO1: apellido1,
            APELLIDO2: apellido2,
            IDENTIFICACION: identificacion,
            TIPO_IDENTIFICACION: tipo_identificacion,
            DIRECCION_CALLE1: direccion_calle1,
            DIRECCION_NUM: direccion_num,
            DIRECCION_CALLE2: direccion_calle2,
            TELEFONO1: telefono1,
            TELEFONO2: telefono2,
            TELEFONO3: telefono3,
            PASSWORD: pwdHash,
            MAIL1: mail1,
            MAIL2: mail2,
            ESTADO: estado,
            FECHA_CADUCIDAD:  fecha_caducidad
        });

        const result =  await sequelize.transaction( async(t) => {

            await user1.save({ transaction: t })
            .then(us1 => {
                let newObj = MapearUsuarioDTO(us1);
                res.status(201).json({
                    message: 'Usuario creado exitosamente..!',
                    user: newObj.dataValues
                });        
            })
            .catch(err=>{
                const error = new Error('Datos ingresados incorrectos..!  ' + err);
                error.statusCode = 500;
                throw error;
            });
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Ocurrió un error al crear el usuario..!   ' + err;
        }
        next(err);
    }
};

exports.actualizarUsuario = async (req, res, next) => {
    try {
        const userId = req.params.usuarioId;
        const codigo = req.body.codigo;
        const origen = req.body.origen;
        const nombre1 = req.body.nombre1;
        const nombre2 = req.body.nombre2;
        const apellido1 = req.body.apellido1;
        const apellido2 = req.body.apellido2;
        const identificacion = req.body.identificacion;
        const tipo_identificacion = req.body.tipo_identificacion;
        const direccion_calle1 = req.body.direccion_calle1;
        const direccion_num = req.body.direccion_num;
        const direccion_calle2 = req.body.direccion_calle2;
        const telefono1 = req.body.telefono1;
        const telefono2 = req.body.telefono2;
        const telefono3 = req.body.telefono3;
        const password = req.body.password;
        const mail1 = req.body.mail1;
        const mail2 = req.body.mail2;
        const estado = req.body.estado; 
        const fecha_caducidad = req.body.fecha_caducidad;
        if (password) {
            pwdHash = bcrypt.hashSync(password, 12);
        }
        const result =  await sequelize.transaction( async(t) => {

            const user_result = await Usuario.findByPk(userId)
                .then(user1 => {
                    if (!user1) {
                        res.status(500).json({ message: 'Usuario no encontrado..!' });       
                    }
                    else {
                        user1.update({ 
                            CODIGO: codigo,
                            ORIGEN: origen,
                            NOMBRE1: nombre1,
                            NOMBRE2: nombre2,
                            APELLIDO1: apellido1,
                            APELLIDO2: apellido2,
                            IDENTIFICACION: identificacion,
                            TIPO_IDENTIFICACION: tipo_identificacion,
                            DIRECCION_CALLE1: direccion_calle1,
                            DIRECCION_NUM: direccion_num,
                            DIRECCION_CALLE2: direccion_calle2,
                            TELEFONO1: telefono1,
                            TELEFONO2: telefono2,
                            TELEFONO3: telefono3,
                            PASSWORD: pwdHash,
                            MAIL1: mail1,
                            MAIL2: mail2,
                            ESTADO: estado,
                            FECHA_CADUCIDAD: fecha_caducidad,
                        }, { transaction: t })
                        .then(us1 => {
                            let newObj = MapearUsuarioDTO(us1);
                            res.status(201).json({
                                message: 'Usuario actualizado exitosamente..!',
                                user: newObj.dataValues
                            });        
                        })
                        .catch(err=>{
                            const error = new Error('Error al actualizar al usuario..!  ' + err);
                            error.statusCode = 500;
                            next(error);
                        });
                    }
                })
                .catch(err1=>{
                    const error = new Error('Datos ingresados incorrectos..!  ' + err1);
                    error.statusCode = 500;
                    throw error;
                });
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Error en método actualizar usuario..!   ' + err;
        }
        next(err);
    }
};

exports.actualizarUsuario1 = async (req, res, next) => {
    try {
        let sql = ` update usuario set `;
        const userId = req.params.usuarioId;

        await Usuario.findByPk(userId)
        .then(user1 => {
            if (!user1) {
                const error = new Error('Usuario no encontrado..!');
                error.statusCode = 422;
                throw error;
            }
        });

        const codigo = req.body.codigo;
        const origen = req.body.origen;
        const nombre1 = req.body.nombre1;
        const nombre2 = req.body.nombre2;
        const apellido1 = req.body.apellido1;
        const apellido2 = req.body.apellido2;
        const identificacion = req.body.identificacion;
        const tipo_identificacion = req.body.tipo_identificacion;
        const direccion_calle1 = req.body.direccion_calle1;
        const direccion_num = req.body.direccion_num;
        const direccion_calle2 = req.body.direccion_calle2;
        const telefono1 = req.body.telefono1;
        const telefono2 = req.body.telefono2;
        const telefono3 = req.body.telefono3;
        let password = req.body.password;
        const mail1 = req.body.mail1;
        const mail2 = req.body.mail2;
        const estado = req.body.estado; 
        const fecha_caducidad = req.body.fecha_caducidad;
        if (codigo) {
            sql += ` CODIGO = :cod, `;
        }
        if (origen) {
            sql += ` ORIGEN = :orig, `;
        }
        if (nombre1) {
            sql += ` NOMBRE1 = :nomb1, `;
        }
        if (nombre2) {
            sql += ` NOMBRE2 = :nomb2, `;
        }
        if (apellido1) {
            sql += ` APELLIDO1 = :apell1, `;
        } 
        if (apellido2) {
            sql += ` APELLIDO2 = :apell2, `;
        }
        if (identificacion) {
            sql += ` IDENTIFICACION = :identif, `;
        }
        if (tipo_identificacion) {
            sql += ` TIPO_IDENTIFICACION = :tipo_identif, `;
        }
        if (direccion_calle1) {
            sql += ` DIRECCION_CALLE1 = :direc_calle1, `;
        }
        if (direccion_num) {
            sql += ` DIRECCION_NUM = :direc_num, `;
        }
        if (direccion_calle2) {
            sql += ` DIRECCION_CALLE2 = :direc_calle2, `;
        }
        if (telefono1) {
            sql += ` TELEFONO1 = :telef1, `;
        }
        if (telefono2) {
            sql += ` TELEFONO2 = :telef2, `;
        }
        if (telefono3) {
            sql += ` TELEFONO3 = :telef3, `;
        }
        if (password) {
            password = bcrypt.hashSync(password, 12);
            sql += ` PASSWORD = :passw, `;
        }
        if (mail1) {
            sql += ` MAIL1 = :email1, `;
        }
        if (mail2) {
            sql += ` MAIL2 = :email2, `;
        }
        if (estado) {
            sql += ` ESTADO = :est, `;
        }
        if (fecha_caducidad) {
            sql += ` FECHA_CADUCIDAD = :fec_cad, `;
        }
        sql += ` updatedAt = :fec_act `;
        sql += ` WHERE ID_USUARIO = :id `;
        const result =  await sequelize.transaction( async(t) => {

            const update_user = await sequelize.query(sql, {
                replacements: { cod: codigo, orig: origen, nomb1: nombre1, nomb2: nombre2, apell1: apellido1, apell2: apellido2, 
                    identif: identificacion, tipo_identif: tipo_identificacion, direc_calle1: direccion_calle1, 
                    direc_num: direccion_num, direc_calle2: direccion_calle2, telef1: telefono1, telef2: telefono2, telef3: telefono3, 
                    passw: password, email1: mail1, email2: mail2, est: estado, fec_cad: fecha_caducidad, fec_act: new Date(), id: userId }
            }, { transaction: t })
            .catch(err=>{
                const error = new Error('Error al actualizar al usuario..!  ' + err);
                error.statusCode = 500;
                next(error);
            });
        });
        //Retorno el usuario después q se actualizó con éxito y se hizo commit en la bdd
        Usuario.findByPk(userId)
        .then(us1 => {
            let newObj = MapearUsuarioDTO(us1);
            res.status(201).json({
                message: 'Usuario actualizado exitosamente..!',
                user: newObj.dataValues
            });
        });        
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Error en método actualizar usuario..!   ' + err;
        }
        next(err);
    }
};


exports.eliminarUsuario = async (req, res, next) => {
    try {
        const userId = req.params.usuarioId;

        const result =  await sequelize.transaction( async(t) => {

            const user_result = await Usuario.findByPk(userId)
                .then(user1 => {
                    if (!user1) {
                        res.status(500).json({ message: 'Usuario no encontrado..!' });       
                    }
                    else {
                        user1.destroy()
                        .then(us1 => {
                            res.status(201).json({
                                message: 'Usuario eliminado exitosamente..!',
                            });        
                        })
                        .catch(err=>{
                            const error = new Error('Error al eliminar el usuario..!  ' + err);
                            error.statusCode = 500;
                            next(error);
                        });
                    }
                })
                .catch(err1=>{
                    const error = new Error('Error al buscar el usuario..!  ' + err1);
                    error.statusCode = 500;
                    throw error;
                });   
        });             
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Error en método eliminar usuario..!   ' + err;
        }
        next(err);
    }
};

function MapearUsuarioDTO(users) {
    return lodash(users, (value, key) => {
        return {
            id: value.ID_USUARIO,
            codigo: value.CODIGO,
            origen: value.ORIGEN,
            nombre1: value.NOMBRE1,
            nombre2: value.NOMBRE2,
            apellido1: value.APELLIDO1,
            apellido2: value.APELLIDO2,
            identificacion: value.IDENTIFICACION,
            tipo_identificacion: value.TIPO_IDENTIFICACION,
            telefono1: value.TELEFONO1,
            mail1: value.MAIL1
        };
    });
}
