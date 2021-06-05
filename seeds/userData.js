const { User } = require('../models');

const userData = [
    {
        username: 'lauren',
        email: 'lauren@gmail.com',
        password: '12345678'
    },
]

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;