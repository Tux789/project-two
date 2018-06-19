var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport){
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup',
        {   successRedirect: '/signin',
            failureRedirect: '/signup'}
    ));

    app.get('/dashboard',isLoggedIn, authController.dashboard);
    
    app.get('/invoice', authController.invoice);

    app.get('/order', authController.order);

    app.get('/manager',authController.manager);

    app.get('/charts',isLoggedIn, authController.charts);

    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin',  
        { successRedirect: '/dashboard',                                              
          failureRedirect: '/signin'}
          ));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/signin');
        }        
    }
}