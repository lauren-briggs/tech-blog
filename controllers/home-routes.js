const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('main', { layout: 'index' });
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