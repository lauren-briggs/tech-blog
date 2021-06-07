const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./user-routes');

// Create new post
router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    console.log(req.session)
    try {
        const newPost = await Post.create({
            post_title: req.body.title,
            post_text: req.body.text,
            user_id: req.session.user_id,
        });
        res.json(newPost)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const updatePost = await Post.update(
            {
                post_title: req.body.title,
                post_text: req.body.text
            },
            {
                where: {
                    id: req.body.postId
                }
            }

        );
        res.json(updatePost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    console.log(req)
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(deletePost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;