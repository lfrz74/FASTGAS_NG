const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = require('../utils/database');

const Perfil_Modulo = sequelize.define('perfil_modulo', {
    ID_PERFIL_MODULO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_PERFIL: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      references: {
        model: 'perfil',
        key: 'ID_PERFIL'
      }
    },
    ID_MODULO: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      references: {
        model: 'modulo',
        key: 'ID_MODULO'
      }
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
    tableName: 'perfil_modulo'
  });

module.exports = Perfil_Modulo;
