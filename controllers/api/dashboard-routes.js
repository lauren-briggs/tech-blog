const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
    console.log(req)
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
        const posts = dbUserPostData.map((post) => gallery.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;