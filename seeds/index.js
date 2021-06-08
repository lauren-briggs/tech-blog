const sequelize = require('../config/connection');
const seedPostData = require('./postData');
const seedCommentData = require('./commentData');
const seedUserData = require('./userData');

const seedAll = async () => {
    console.log('Running seeds')
    await sequelize.sync({ force: true });
    await seedUserData();
    await seedPostData();
    await seedCommentData();
}

module.exports = seedAll;