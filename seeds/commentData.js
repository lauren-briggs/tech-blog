const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'I just learned this in my class!',
        user_id: 1,
        post_id: 1,
    },
]

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData;