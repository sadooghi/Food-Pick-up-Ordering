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

// Seperated Routes for each Resource
// const usersRoutes = require("./routes/users");

const foodRoutes = require("./routes/food_access");
// const restaurantRoutes = require("./routes/main_rout");


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

app.use("/menu", foodRoutes(knex));

// redirect CSS bootstrap
app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));



// Home page
app.get("/", (req, res) => {
  res.render("index", {username: req.session.username});
});

app.get("/restaurant",(req,res) => {
  knex
      .select("*")
      .from("foods")
      .then((results) => {
        res.json(results);
      })
});

app.get("/login", (req, res) => {
  //if there is a cookie, ie. user is logged in, dont show login page and instead go to main page
  if(req.session.username){
    res.redirect("/")
  }else {
    res.render("login",{ error: undefined});
  }
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
