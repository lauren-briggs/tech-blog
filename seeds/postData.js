const { Post } = require('../models');

const postData = [
    {
        post_title: 'Why is MVC so important?',
        post_text: 'MVC allows developers to maintain a true separate of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
        user_id: 1,
    },
    {
        post_title: 'Authentication vs. Authorization',
        post_text: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed to access the system.',
        user_id: 1,
    },
]

const seedPostData = () => Post.bulkCreate(postData);

module.exports = seedPostData;