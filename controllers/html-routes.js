var path = require("path")
var authController = require("./authcontroller");

module.exports = function (app, passport) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/invoice", authController.isLoggedIn, function (req, res) {
        console.log(req.user);
        res.sendFile(path.join(__dirname, "../public/invoice.html"));
    });

    app.get("/manager", authController.isLoggedIn, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/manager.html"));
    });

    app.get("/charts", authController.isLoggedIn, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/charts.html"));
       // res.sendFile(path.join(__dirname, "../public/chartTest.html"));
    });


    app.get("/order", authController.isLoggedIn, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/order.html"));
    });

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup',
        { successRedirect: '/signin',
        failureRedirect: '/signup'}
    ));

    app.get('/dashboard',authController.isLoggedIn, authController.dashboard);

    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin',  
        { successRedirect: '/dashboard',                                              
          failureRedirect: '/signin'} ));
    
};