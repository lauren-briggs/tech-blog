const sequelize = require('../config/connection');
const seedPostData = require('./postData');
const seedCommentData = require('./commentData');
const seedUserData = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUserData();
    await seedPostData();
    await seedCommentData();

    process.exit(0);
}

seedAll();