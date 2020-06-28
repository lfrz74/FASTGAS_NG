const Sequelize = require('sequelize');

const sequelize = new Sequelize('seguridad', 'root', 'Bols1alarge', {
    host: 'localhost',
    dialect: 'mysql',
    define: {},
    pool: {
      handleDisconnects: true,
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000
    },    
});

module.exports = sequelize;