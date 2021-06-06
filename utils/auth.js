// const withAuth = (req, res, next) => {
//     if (!req.session.user_id) {
//         console.log(`Has auth: ${req.session.user_id}`);
//         res.redirect('/login');
//     } else {
//         console.log(`Has auth: ${req.session.user_id}`);
//         next();
//     }
// };

// module.exports = withAuth;