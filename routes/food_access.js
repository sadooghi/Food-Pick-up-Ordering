"use strict";

const express     = require('express');
const app         = express();
const router      = express.Router();
const knexConfig  = require('../knexfile')
const knex        = require('knex')(knexConfig.development)
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
//twillio
var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
var client = twilio('AC06f14f0f86060526d0f9be2457da9957', '46cb2d785ad31bfbb3a19e7246ce2d5f');

app.use(morgan('dev'));
app.use(knexLogger(knex));


function random_time (){
  return Math.ceil(Math.round(Math.random()*((40 - 10)) + 10));
  }
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
          // console.log(114,insertResult)
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
      .select("*")
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
                user_id: uID.id,
                cart_id: cart.id,
                phone:   uID.phone
              })
              .then((cartres)=>{
                console.log(cartres)
                console.log(145,cart.id)
                knex.from('foods')
                  .innerJoin('cartsfoods', 'foods.id', 'cartsfoods.food_id')
                  .innerJoin('carts', 'carts.id', 'cartsfoods.cart_id')
                  .select("name")
                  .where("cartsfoods.cart_id", cart.id)
                  .then((res) => {
                    console.log(res)
                    // // console.log(150,name)
                    //sms to customer
                    client.sendMessage({
                      to: '+16044422496',
                      from: '+16043301252',
                      body: `Hello! your order will be ready in ${random_time ()} mineuts !`
                    }, function(err, message) {
                        console.log(message.sid);
                    });

                    // Send sms to restaurant owner
                    client.sendMessage({
                      to: '+16044422496',
                      from: '+16043301252',
                      body: `Hello! you have an order of ${JSON.stringify(res)}`
                    }, function(err, message) {
                        console.log(message.sid);
                    });
                    // res.send(cartres);
                    })


              });

          });
      });
  });

  router.get("/api/deletecart", (req, res) => {
    knex('cartsfoods')
    .del()
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