// "use strict";

// const express = require('express');
// const router  = express.Router();
// // const knexConfig = require('./knexfile')
// // const knex = require('knex')(knexConfig.development)

// module.exports = (knex) => {

//   router.get("/", (req, res) => {
//     knex
//       .select("*")
//       .from("users")
//       .then((results) => {

//         // results = results.concat([{
//         //     id: 1,
//         //     name: "Chicken Shawarma",
//         //     description: "Fresh chicken shawarma served with rice and choice of two toppings.",
//         //     picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/368632bd2be57af7ebfa7a7ed7b570d1',
//         //     price: 8
//         //   },
//         //   {
//         //     id: 2,
//         //     name: "Falafel Wrap",
//         //     description: "Fresh and delicious Falafel.",
//         //     picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/b20ef3546a8f87a2db20f4bbe6094a79',
//         //     price: 6.75
//         //   },
//         //   {
//         //     id: 3,
//         //     name: "Beef Shawarma Plate",
//         //     description: "Fresh beef shawarma served with rice, and choice of two items.",
//         //     picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/fc77f26e72090060668801f6ade4ed91',
//         //     price: 14
//         //   }
//         //  ]);

//         console.log(results);
//         res.json(results);
//     });
//   });

//   return router;
// }
