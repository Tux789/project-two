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
var env        = require('dotenv').load();
var exphbs     = require('express-handlebars');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

//For Handlebars
app.set('views','./views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
      res.redirect('signup');
});

// For Passport
app.use(session({ secret: 'secret cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var initialize = require("./controllers/initialization");
initialize.seedProducts();

// Routes
// =============================================================
require('./config/passport/passport.js')(passport, db.user);
require("./controllers/api-routes")(app, passport);
// require("./controllers/html-routes")(app, passport);
require('./routes/auth.js')(app, passport);



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("http:\\localhost:" + PORT);
  });
});
