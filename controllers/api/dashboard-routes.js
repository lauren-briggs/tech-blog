const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
    console.log(req.session)
    try {
        const dbUserPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: {
                model: User,
                as: 'user',
                attributes: ['username'],
            }
        });
        console.log(dbUserPostData);
        const posts = dbUserPostData.map((post) => post.get({ plain: true }));
        console.log(posts)
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn, layout: 'index' })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;