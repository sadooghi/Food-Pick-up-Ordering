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

        res.json(results);
    });
  });

  router.post("/:item", (req, res) =>{
    knex("carts")
      .select("id")
      //HARD CODED, NEED TO FIGURE OUT HOW TO FIND CURRENT USERID
      .where('user_id', 1738)
      .orderBy('id', 'desc')
      .first("id")
      .then((cart) => {
        // // console.log(Number(req.params.item), cart[0].id);
        knex("cartsfoods")
          .insert({food_id: Number(req.params.item), cart_id: cart.id})
          .then(() => {
          });
            return (cart);
        })
      .then((cart) => {
        knex("cartsfoods")
          .select("*")
          .where("cart_id", cart.id)
          .innerJoin("foods", function() {
            this.on("cartsfoods.food_id", '=', 'foods.id')
          })
          .then((food) => {
            res.json(food);
          });
      });
  });

//******INSERTING A NEW CART+USERID******* INTO CARTS TABLE
  router.post("/:user_id/cart", (req, res) =>{
    var found =
      knex("users").select("*").where('id', req.params.user_id);

    //GOING TO REMOVE ONCE LOGIN INPUTS TO USERID TABLE
    if(found == undefined){

      knex("users")
        .insert({id: req.params.user_id, username: "PATRICK", password: "password", email: "patrick@cn.star"})
        .then(() => {
      //********************
          //INSERTING FIRST CART FOR A NEWLY REQUESTED USER_ID
          knex("carts")
            .insert({user_id: req.params.user_id})
            .then((insertResult) =>{
              res.json(insertResult);
          });
        });

    }else{
      //assume user already exists and cart created already
      knex("carts")
        .insert({'user_id': req.params.user_id})
        .then((insertResult) =>  {
          res.json(insertResult);
      });
    }
  });


//******INSERTING A CART_ID INTO THE ORDER *********WITH USER_ID
  router.post("/:user_id/order", (req, res) => {
    var uid = req.params.user_id;
    knex("carts")
      .select("id")
      //HARD CODED, NEED TO FIGURE OUT HOW TO FIND CURRENT USERID
      .where('user_id', uid)
      .orderBy('id', 'desc')
      .first("id")
      .then((cart) => {
        knex("orders")
          .insert({
            phone: req.body.phone,
            user_id: uid,
            cart_id: cart.id
          })
          .then(()=>{
            res.send(uid);
          });

      });
  });



  return router;

}