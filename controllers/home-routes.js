const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll().catch((err) => {
            res.json(err);
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts)
        res.render('home', { posts, loggedIn: req.session.loggedIn, layout: 'index' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const dbSinglePostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        }).catch((err) => {
            res.json(err);
        })
        const post = dbSinglePostData.get({ plain: true });
        console.log(post)
        res.render('post', { post, loggedIn: req.session.loggedIn, layout: 'index' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', { layout: 'index' })
    // try {
    //     res.render('login', { layout: 'index' })

    // } catch (err) {
    //     res.status(500).json(err)
    // }
});



router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { layout: 'index' })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', { layout: 'index' })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/newpost', async (req, res) => {
    try {
        res.render('newpost', { layout: 'index' })

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;