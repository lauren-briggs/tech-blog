const router = require('express').Router();

const userRoutes = require('./user-routes');
const dashboardRoutes = require('./dashboard-routes');
const postRoutes = require('./post');

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', postRoutes);

module.exports = router;