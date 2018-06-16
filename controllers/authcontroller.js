var exports = module.exports = {}

var path = require("path")

exports.signup = function(req,res){
    res.render('signup');
};

exports.signin = function(req, res){
    res.render('signin');
};

exports.dashboard = function(req, res){
    res.render('dashboard');
};

exports.logout = function (req,res) {
    res.render('signin');
}
