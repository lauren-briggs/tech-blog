const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.CLEARDB_DATABASE_URL
);

module.exports = sequelize;