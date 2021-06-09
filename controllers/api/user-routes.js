const router = require('express').Router();
const { User } = require('../../models');
const { check, validationResult } = require('express-validator');

// Create new user
router.post('/signup',
    check('username').custom(value => {
        return User.findOne({
            where: {
                username: value
            }
        }).then(user => {
            if (user) {
                return Promise.reject('Username taken')
            }
        });
    }),
    check('email').custom(value => {
        return User.findOne({
            where: {
                email: value
            }
        }).then(email => {
            if (email) {
                return Promise.reject('Email already in use')
            }
        });
    }),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;
                res.status(200).json(newUser);
                return;
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

// Log in user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'Incorret username or password' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
            return;
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;