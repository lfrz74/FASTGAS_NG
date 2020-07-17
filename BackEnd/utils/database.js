const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME_SEGURIDAD, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_SERVER,
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