const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new comment
router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    console.log(req.session)
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.json(newComment)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;