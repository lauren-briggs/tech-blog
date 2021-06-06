const router = require('express').Router();
const { User } = require('../../models');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

// create new user
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// log in
// router.post('/login', urlEncodedParser, async (req, res) => {
//     console.log(req.body)
//     try {
//         const dbUserData = await User.findOne({
//             where: {
//                 username: req.body.username,
//             },
//         }).catch((err) => { res.json(err) });
//         if (!dbUserData) {
//             res.status(400).json({ message: 'Incorrect email or password.' });
//             return;
//         }
//         const validPassword = await dbUserData.checkPassword(req.body.password);
//         if (!validPassword) {
//             res.status(400).json({ message: 'Incorrect email or password.' });
//             return;
//         }
//         req.session.save(() => {
//             req.session.loggedIn = true;
//             res.status(200).json({ user: dbUserData, message: 'Logged in!' });
//         });
//         console.log(`Logged in: ${req.session.loggedIn}`);
//         // res.redirect('/');
//         res.render('home', { loggedIn: req.session.loggedIn, layout: 'index' })
//         // res.end();
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

// Log in #2
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