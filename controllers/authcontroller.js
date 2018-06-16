var exports = module.exports = {}

var path = require("path")

exports.signup = function(req,res){
    res.sendFile(path.join(__dirname + '../public/signup.html'));
};

exports.signin = function(req, res){
    res.sendFile(path.join(__dirname + '../public/signin.html'));
};

exports.dashboard = function(req, res){
    res.sendFile(path.join(__dirname+'../public/index.html'));
};

exports.logout = function (req,res) {
    res.sendFile(path.join(__dirname + '../public/signin.html'));
}
