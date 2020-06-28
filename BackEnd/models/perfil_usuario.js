const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = require('../utils/database');

const Perfil_Usuario = sequelize.define('perfil_usuario', {
    ID_PERFIL_USUARIO: {
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
    ID_USUARIO: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'ID_USUARIO'
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
    tableName: 'perfil_usuario'
  });

module.exports = Perfil_Usuario;
