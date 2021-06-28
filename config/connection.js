const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database

const sequelize = new Sequelize(process.env.CLEARDB_URL)

module.exports = sequelize;
