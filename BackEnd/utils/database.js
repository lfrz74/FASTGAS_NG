const Sequelize = require('sequelize');
const env = process.env.NODE_ENV;

const development = new Sequelize(
  process.env.DB_NAME_SEGURIDAD, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
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

const test = new Sequelize(
  process.env.DB_NAME_SEGURIDAD_TEST, 
  process.env.DB_USER_TEST, 
  process.env.DB_PASS_TEST, {
    host: process.env.DB_SERVER_TEST,
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

const production = new Sequelize(
  process.env.DB_NAME_SEGURIDAD_PRD, 
  process.env.DB_USER_PRD, 
  process.env.DB_PASS_PRD, {
    host: process.env.DB_SERVER_PRD,
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

const sequelize = {
  development,
  test,
  production
 };

module.exports = sequelize[env];