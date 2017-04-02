"use strict";

const express = require('express');
const router  = express.Router();
const app         = express();
const knexConfig  = require("../knexfile");
const ENV         = process.env.ENV || "development";
const knex        = require("knex")(knexConfig[ENV]);

const foodRoutes        = require("./food_access");


module.exports = (knex) => {

  app.use("/:id/menu", foodRoutes(knex));

  router.get("/", (req, res) => {
    console.log("found restaurant");

  });

  return router;
}