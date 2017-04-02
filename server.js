"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const bcrypt = require('bcrypt');

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ["ghazaleh"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

// Seperated Routes for each Resource
// const usersRoutes = require("./routes/users");

const restaurantRoutes  = require("./routes/restaurants_access");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

//DIFFERENT THAN THE GET/ RESTAURANT BECAUSE SINGLE
//THIS GET/ IS A ROUTE WITH RESTAURANT *SSSSSS*
app.use("/restaurants", restaurantRoutes(knex));

// redirect CSS bootstrap
app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));

// Configure the Facebook strategy for use by Passport.
passport.use(new Strategy({
    clientID: '203993170088169',
    clientSecret: '26130e020d7384708caf46db19229efe',
    callbackURL: 'http://localhost:8080/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

// Configure Passport authenticated session persistence.

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the session.

app.use(passport.initialize());
app.use(passport.session());


// Home page
app.get("/", (req, res) => {
  let username = '';
  let isSessionEmpty = (Object.keys(req.session).length === 0);
  if(req.session.username){
    username = req.session.username;
  } else if(req.session.passport) {
    username = req.session.passport.user.displayName;
  }
  res.render("index", {isSessionEmpty: isSessionEmpty , username: username});
});

app.get("/restaurants/:id/menu",(req,res) => {
  knex
      .select("*")
      .from("foods")
      .where("restaurant_id", req.params.id)
      .then((results) => {
        res.json(results);
      })
});

app.get("/restaurants",(req,res) => {
let username = '';
  let isSessionEmpty = (Object.keys(req.session).length === 0);
  if(req.session.username){
    username = req.session.username;
  } else if(req.session.passport) {
    username = req.session.passport.user.displayName;
  }
    knex
      .select("*")
      .from("restaurants")
      .then((results) => {
        res.render("dropDown", {isSessionEmpty: isSessionEmpty, username: username});
      })
});

app.get("/restaurants/:area",(req,res) => {
  console.log(122,req.params)
  knex
      .select("*")
      .from("restaurants")
      .where('area', req.params.area)
      .then((results) => {
        res.json(results);
      })
});

app.get("/restaurant/:id",(req,res) => {
  knex
      .select("*")
      .from("foods")
      .where('restaurant_id', req.params.id)
      .then((results) => {
        res.json(results);
      })
});

// app.get("/restaurant/:id/menu",(req,res) => {

// });

app.get("/login", (req, res) => {
  //if there is a cookie, ie. user is logged in, dont show login page and instead go to main page
  if(req.session.username){
    res.redirect("/")
  }else {
    res.render("login",{ error: undefined});
  }
});

app.get("/login/facebook",
  passport.authenticate('facebook'), function(req, res) {

  });

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


app.post("/login", (req, res) => {
  //check if the user and pass are stored in db
  knex('users')
    .where({username: req.body.username}).first()
    .then( (user) => {

      if(user == undefined){
        res.render('login',{error: 'username is not valid'})
        return;
      }
      bcrypt.compare(req.body.password, user.password).then((response) => {
        if(response){
          req.session.username = req.body.username;
          res.redirect('/')

      }else{
        res.render('login',{error: 'password is not valid'})
      }
      })

    })
    .catch((e) =>{
      res.render('login', { error: 'DataBase error occured'})
    })

});


app.get("/register", (req, res) => {
  //if there is a cookie, ie. user is loged in, dont open register page and instead go to main page
  if(req.session.username){
    res.redirect("/")
  }else {
    res.render("register", {error: false});
  }
});

app.post("/register", (req, res) => {
  //check username, email and password not be empty
  if (req.body.email == "" || req.body.password == "" || req.body.username == ""){
    res.render('register', {error: 'Please fill all three fields.'})
    return;
  }

  knex('users')
    .where({username: req.body.username}).orWhere({ email: req.body.email})
    .then((users) => {
      //check username and email be unique
      if (users.length > 0) {
        res.render('register', {error: 'This username/email has been used before.'})
      } else {
        //create user in DB
        knex('users')
          .insert({ username: req.body.username, password: bcrypt.hashSync(req.body.password, 10) , email:req.body.email })
          .then(function(result) {
            //define cookie
            req.session.username = req.body.username;
               res.redirect("/login");
          })
      }
    })
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
