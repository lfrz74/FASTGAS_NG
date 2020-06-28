const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = require('../utils/database');

const Modulo = sequelize.define('modulo', {
    ID_MODULO: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DESCRIPCION: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ESTADO: {
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
    tableName: 'modulo'
  });

module.exports = Modulo;