// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express    = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport');
var session    = require('express-session');
var expressValidator = require('express-validator');
var env        = require('dotenv').load();
var exphbs     = require('express-handlebars');
var flash      = require('connect-flash');
var cookieParser = require('cookie-parser');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

// Static directory
app.use(express.static("public"));
app.set('public', './public')
    app.engine('hbs', exphbs({extname: '.hbs'}));
    app.set('view engine', '.hbs');

// app.get('/', function(req, res){
//       res.redirect('signup');
// });

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Routes
// =============================================================
require("./controllers/api-routes")(app);
require("./controllers/html-routes")(app);
require('./routes/auth.js')(app, passport);
require('./config/passport/passport.js')(passport, db.user);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
