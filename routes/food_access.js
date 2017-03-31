"use strict";

const express = require('express');
const router  = express.Router();
// const knexConfig = require('./knexfile')
// const knex = require('knex')(knexConfig.development)

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex
      .select("*")
      .from("foods")
      .then((results) => {

        console.log(results);
        res.json(results);
    });
  });

  return router;
}