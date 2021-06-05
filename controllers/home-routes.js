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