"use strict";

const express = require('express');
const router  = express.Router();
// const knexConfig = require('./knexfile')
// const knex = require('knex')(knexConfig.development)

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log("found restaurant");

  });
  return router;
}