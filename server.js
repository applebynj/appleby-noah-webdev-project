var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: 'this is the secret', //TODO: move to env variable
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(express.static(__dirname + '/public'));

require("./project/app");

var port = process.env.PORT || 3000;
app.listen(port);