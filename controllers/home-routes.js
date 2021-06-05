const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    const dbPostData = await Post.findAll().catch((err) => {
        res.json(err);
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts)
    res.render('main', { posts, layout: 'index' });
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
        res.render('post', { post, layout: 'index' });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/login', async (req, res) => {
    try {
        res.render('login', { layout: 'index' })

    } catch (err) {
        res.status(500).json(err)
    }
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

module.exports = router;