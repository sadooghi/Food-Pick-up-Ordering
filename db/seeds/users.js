exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('resturants').del(),
    knex('foods').del()
  ])
    .then(function () {

      return Promise.all([

        knex('resturants')
          .insert({name: 'Urawa Sushi', location: ' 254 Adelaide Street West, Toronto, ON M5H 1X6', food_type: 'Japanese'} ),


        knex('foods')
            .insert({
              name: 'Sandwich Roll',
              description: 'Spicy tuna, spicy salmon, crabmeat, avocado, and egg with special sauce on top.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/8f982783aaff08d52a26669bf35b633a',
              price: 14.95,
              currency: 'CAD'
            }),
        knex('foods')
            .insert({
              name: 'Salmon Lover',
              description: '6 pieces of salmon sushi, 6 pieces of salmon sashimi, 6 pieces of spicy salmon roll, 1 piece of spicy salmon hand roll, and 1 piece of salmon hand roll. Served with soup and salad.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/8e28bcce1415994e2029d9f7ec868075',
              price: 25.99,
              currency: 'CAD'
            }),
        knex('foods')
            .insert({
              name: 'Teriyaki',
              description: 'Served with soup, salad, rice, and vegetables.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e0cfca773339e40af241513eee8f1ccd',
              price: 14.5,
              currency: 'CAD'
            }),
         knex('foods')
            .insert({
              name: 'Coconut Shrimp',
              description: 'Served with soup',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e3e98b6c11ddaf328a0e25061be4b87b',
              price: 14.95,
              currency: 'CAD'
            }),
          knex('foods')
            .insert({
              name: 'Cherry Blossom Roll',
              description: 'Deep-fried roll with spicy tuna and avoo inside, topped with crabmeat and special sauce.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/aa831f80a4bddfb509359c62043b4749',
              price: 12.95,
              currency: 'CAD'
            }),
           knex('foods')
            .insert({
              name: 'Chicken Teriyaki',
              description: 'Served with soup',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e0cfca773339e40af241513eee8f1ccd',
              price: 7.95,
              currency: 'CAD'
            })
      ]);
    });
};
