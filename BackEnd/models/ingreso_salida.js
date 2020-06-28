const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = require('../utils/database');

const Ingreso_Salida = sequelize.define('ingreso_salida', {
    ID_INGRESO_SALIDA: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_USUARIO: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    FECHA_HORA: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    INGRESO_SALIDA: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    IP: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    NOMBRE_PC: {
      type: DataTypes.STRING(32),
      allowNull: true
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
    tableName: 'ingreso_salida'
  });

module.exports = Ingreso_Salida;