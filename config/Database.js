const { Sequelize } = require("sequelize");

const dotenv = require('dotenv');
const result = dotenv.config();

require('dotenv').config();


if (result.error) {
  throw ".env gets error!: " + result.error;
}

console.log(result.parsed);


const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER || 'root', 
    process.env.DB_PASS || '',  // Ensure it defaults to an empty string if not set
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT
    }
  );
  
  db.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  
  module.exports = db;
