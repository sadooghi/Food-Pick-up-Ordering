"use strict";

const express     = require('express');
const app         = express();
const router      = express.Router();
const knexConfig  = require('../knexfile')
const knex        = require('knex')(knexConfig.development)
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

app.use(morgan('dev'));
app.use(knexLogger(knex));
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
    // knex
    //   .select("*")
    //   .from("foods")
    //   .where("restaurant_id", req.params.id)
    //   .then((results) => {

        res.render("index", {isSessionEmpty: isSessionEmpty , username: username});
      // });
  });

  router.get("/all/:id", (req, res) => {
    console.log("successful route");
    let username = '';
    let isSessionEmpty = (Object.keys(req.session).length === 0);
    if(req.session.username){
      username = req.session.username;
    } else if(req.session.passport) {
      username = req.session.passport.user.displayName;
    }
    // knex
    //   .select("*")
    //   .from("foods")
    //   .where("restaurant_id", req.params.id)
    //   .then((results) => {

        res.render("index", {isSessionEmpty: isSessionEmpty , username: username});
      // });
  });

  router.post("/add/:item", (req, res) =>{
    var uName = req.session.username;
     knex("users")
      .select("id")
      .where("username", uName)
      .first()
      .then((uID) => {
        knex("carts")
          .select("id")
          //HARD CODED, NEED TO FIGURE OUT HOW TO FIND CURRENT USERID
          .where('user_id', uID.id)
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

  });


//SUCCESSFULLY REFACTORED
//******INSERTING A NEW CART+USERID******* INTO CARTS TABLE
  router.post("/cart/", (req, res) =>{
      //assume user already exists in request session and cart created already
     var uName = req.session.username;
     knex("users")
      .select("id")
      .where("username", uName)
      .first()
      .then((uID) => {
        knex("carts")
        .insert({'user_id': uID.id})
        .then((insertResult) =>  {
          res.json(insertResult);
        });
      });

    //}
  });

//REFACTORING
//******INSERTING A CART_ID INTO THE ORDER *********WITH USER_ID
  router.post("/order", (req, res) => {
    var uName = req.session.username;
    knex("users")
      .select("id")
      .where("username", uName)
      .first()
      .then((uID) => {
        knex("carts")
          .select("id")
          //HARD CODED, NEED TO FIGURE OUT HOW TO FIND CURRENT USERID
          .where('user_id', uID.id)
          .orderBy('id', 'desc')
          .first("id")
          .then((cart) => {
            knex("orders")
              .insert({
                phone: req.body.phone,
                user_id: uID.id,
                cart_id: cart.id
              })
              .then((cart)=>{
                res.send(cart);
              });

          });
      });
  });

  router.get("/api/:rest_id", (req, res) => {
    var rest_id = req.params.rest_id;
    knex("foods")
    .select("*")
    .where("restaurant_id", rest_id)
    .then((menu) => {
      res.json(menu);
    });
  });



  return router;

}