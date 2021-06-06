const router = require('express').Router();
const { Post } = require('../../models');
// const withAuth = require('../../utils/auth');
// const bodyParser = require('body-parser');
// const urlEncodedParser = bodyParser.urlencoded({ extended: false })

// Create new post
router.post('/', async (req, res) => {
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


module.exports = router;