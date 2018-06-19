var exports = module.exports;

exports.signup = function(req,res){
    res.render('signup');
};

exports.signin = function(req, res){
    res.render('signin');
};

exports.dashboard = function(req, res){
    res.render('dashboard');
};

exports.invoice = function(req,res){
    res.render('invoice');
  }
  
exports.order =function(req,res){
    res.render('order');
  }
  
exports.manager = function(req,res){
    res.render('manager');
  }

exports.charts = function(req, res){
    res.render('charts');
};

exports.logout = function (req,res) {
    req.logout();
    res.render('signin');
};


exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/signin');
    }
}
