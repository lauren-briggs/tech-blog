const router = require('express').Router();
const { User } = require('../../models');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

// create new user
router.post('/signup', urlEncodedParser, async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// log in
router.post('/login', urlEncodedParser, async (req, res) => {
    console.log(req.body)
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return
        }
        const validPassword = await dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ user: dbUserData, message: 'Logged in!' });
        });
        console.log(`Logged in: ${req.session.loggedIn}`);
        // res.redirect('/');
        res.render('main', { layout: 'index' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;