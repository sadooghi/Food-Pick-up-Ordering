"use strict";

const express = require('express');
const router  = express.Router();
const app     = express();
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig.development);


app.use(morgan('dev'));
app.use(knexLogger(knex));

// Seperated Routes for each Resource
const foodRoutes = require("./food_access");
router.use("/menu", foodRoutes(knex));

// const knexConfig = require('./knexfile')
// const knex = require('knex')(knexConfig.development)

module.exports = (knex) => {
  router.get("/", (req, res) => {
    console.log("successful route");
    let username = '';
    let isSessionEmpty = (Object.keys(req.session).length === 0);
    if(req.session.username){
      username = req.session.username;
    } else if(req.session.passport) {
      username = req.session.passport.user.displayName;
    }

    res.render("dropDown", {isSessionEmpty: isSessionEmpty , username: username});
    // });
  });


  router.get("/all",(req,res) => {
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
        res.json(results);
      })
  });

  app.get("/location/:area",(req,res) => {
    // console.log(122,req.params)
    knex
      .select("*")
      .from("restaurants")
      .where('area', req.params.area)
      .then((results) => {
        res.json(results);
      })
  });

  app.get("/select/:id",(req,res) => {
    req.session.
    knex
      .select("*")
      .from("foods")
      .where('restaurant_id', req.params.id)
      .then((results) => {
        res.json(results);
      })
  });

  // app.get("/api/deletecart", (req, res) => {
  //   console.log('hello1');
  // });

  return router;

}