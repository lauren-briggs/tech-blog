const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');
const seedAll = require('../seeds/index')

// Get all posts
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

// Get one post
router.get('/post/:id', async (req, res) => {
    try {
        const dbSinglePostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
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

// Render log in
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', { loggedIn: req.session.loggedIn, layout: 'index' })
});

// Render sign up
router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { loggedIn: req.session.loggedIn, layout: 'index' })
        return;
    } catch (err) {
        res.status(500).json(err)
    }
});

// Render dashboard
router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', { loggedIn: req.session.loggedIn, layout: 'index' })
        return;
    } catch (err) {
        res.status(500).json(err)
    }
});

// Render new post
router.get('/newpost', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render('newpost', { loggedIn: req.session.loggedIn, layout: 'index' })
        } else {
            res.redirect('/');
            return;
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// Render update post
router.get('/update/:id', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const editPost = await Post.findByPk(req.params.id, {
                attributes: [
                    'id',
                    'post_title',
                    'post_text',
                    'user_id',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'comment_text', 'user_id', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    }
                ]
            });
            res.render('update', { editPost, loggedIn: req.session.loggedIn, layout: 'index' });
            console.log(editPost);
            return;
        } else {
            res.redirect('/')
            return;
        }
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get('/seed', (req, res) => {
    seedAll();
    res.status(200).json('ok')
})


module.exports = router;