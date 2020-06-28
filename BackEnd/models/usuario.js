const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = require('../utils/database');

const Usuario = sequelize.define('usuario', {
  ID_USUARIO: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  CODIGO: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  },
  ORIGEN: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  NOMBRE1: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  NOMBRE2: {
    type: DataTypes.STRING(32),
    allowNull: true
  },
  APELLIDO1: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  APELLIDO2: {
    type: DataTypes.STRING(32),
    allowNull: true
  },
  IDENTIFICACION: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  TIPO_IDENTIFICACION: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  DIRECCION_CALLE1: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  DIRECCION_NUM: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  DIRECCION_CALLE2: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  TELEFONO1: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  TELEFONO2: {
    type: DataTypes.STRING(16),
    allowNull: true
  },
  TELEFONO3: {
    type: DataTypes.STRING(16),
    allowNull: true
  },
  PASSWORD: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  MAIL1: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  MAIL2: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  ESTADO: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  FECHA_CADUCIDAD: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'usuario'
});


module.exports = Usuario;