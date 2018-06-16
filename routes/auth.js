var authController = require('../controllers/authcontroller');

module.exports = function(app, passport){
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authController('local-signup',
    { successRedirect: '/signin',
    failureRedirect: '/signup'}
    ));

    app.get('/',isLoggedIn, authController.dashboard);

    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin',  
    { successRedirect: '/dashboard',                                              
        failureRedirect: '/signin'} ));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}