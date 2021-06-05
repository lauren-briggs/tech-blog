const sequelize = require('../config/connection');
const seedPostData = require('./postData');
const seedCommentData = require('./commentData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedPostData();
    await seedCommentData();

    process.exit(0);
}

seedAll();