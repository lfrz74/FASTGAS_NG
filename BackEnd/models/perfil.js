const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = require('../utils/database');

const Perfil = sequelize.define('perfil', {
    ID_PERFIL: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CODIGO: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    },
    DESCRIPCION: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    FECHA_CREACION: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    FECHA_CADUCIDAD: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ACTIVO: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    CREATEDAT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    UPDATEDAT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'perfil'
  });

module.exports = Perfil;
