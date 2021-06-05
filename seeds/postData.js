const { Post } = require('../models');

const postData = [
    {
        post_title: '',
        post_text: '',
        user_id: 1
    },
    {
        post_title: '',
        post_text: '',
        user_id: 2
    },
    {
        post_title: '',
        post_text: '',
        user_id: 2
    },
]

const seedPostData = () => Post.bulkCreate(postData);

module.exports = seedPostData;