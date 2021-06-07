const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./user-routes');
// const bodyParser = require('body-parser');
// const urlEncodedParser = bodyParser.urlencoded({ extended: false })

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

// Delete a post
// router.delete('/:id', withAuth, async (req, res) => {
//     console.log(req)
//     try {
//         const deletePost = await Post.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json(deletePost);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;