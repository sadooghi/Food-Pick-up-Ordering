exports.seed = function(knex, Promise) {
  return knex('foods').del()
  .then(() => {
    return knex('restaurants').del();
  }).then(function () {
      return knex('restaurants')
        .returning('id')
        .insert([{name: 'Urawa Sushi', location: ' 254 Adelaide Street West, Toronto, ON M5H 1X6', food_type: 'Japanese', picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/ea5ecee4aae081082617b88bb6bdb9a8'},
          {name: 'Darbar Persian Grill', location: '  2015 avenue Rd., NORTH YORK, ON M5M 4A5', food_type: 'Persian', picture: 'https://duyt4h9nfnj50.cloudfront.net/resized/4b493cf33eef1686f669f81ccb4c549e-w550-4c.jpg'},
          {name: 'Burger\'s Priest', location: '1599 The Queensway, Etobicoke, ON M8Z 1V1', food_type: 'Hamburger', picture: 'https://duyt4h9nfnj50.cloudfront.net/resized/e837d31ee51323c497e607a3966452af-w550-60.jpg'},
          {name: 'Swiss Chalet Rotisserie & Grill', location: '1255 The Queensway, Etobicoke, ON M8Z 1S', food_type: 'Burgers and Wings', picture: 'https://duyt4h9nfnj50.cloudfront.net/resized/941c97b494893a4f19eb8a1d0348e731-w550-60.jpg'}
        ])
    })
  .then((result) => {

    return Promise.all([
      knex('foods')
        .insert([{
          name: 'Sandwich Roll',
          description: 'Spicy tuna, spicy salmon, crabmeat, avocado, and egg with special sauce on top.',
          picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/8f982783aaff08d52a26669bf35b633a',
          price: 14.95,
          currency: 'CAD',
          restaurant_id: result[0]
        },
        {
            name: 'Salmon Lover',
            description: '6 pieces of salmon sushi, 6 pieces of salmon sashimi, 6 pieces of spicy salmon roll, 1 piece of spicy salmon hand roll, and 1 piece of salmon hand roll. Served with soup and salad.',
            picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/8e28bcce1415994e2029d9f7ec868075',
            price: 25.99,
            currency: 'CAD',
            restaurant_id: result[0]
          },
          {
            name: 'Teriyaki',
            description: 'Served with soup, salad, rice, and vegetables.',
            picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e0cfca773339e40af241513eee8f1ccd',
            price: 14.5,
            currency: 'CAD',
            restaurant_id: result[0]
          },
          {
            name: 'Coconut Shrimp',
            description: 'Served with soup',
            picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e3e98b6c11ddaf328a0e25061be4b87b',
            price: 14.95,
            currency: 'CAD',
            restaurant_id: result[0]
          },
          {
            name: 'Cherry Blossom Roll',
            description: 'Deep-fried roll with spicy tuna and avoo inside, topped with crabmeat and special sauce.',
            picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/aa831f80a4bddfb509359c62043b4749',
            price: 12.95,
            currency: 'CAD',
            restaurant_id: result[0]
          },
          {
            name: 'Chicken Teriyaki',
            description: 'Served with soup',
            picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e0cfca773339e40af241513eee8f1ccd',
            price: 7.95,
            currency: 'CAD',
            restaurant_id: result[0]
          },
          {
            name: 'Sultani Kebab Combo',
            description: 'Combination of skewer of ground beef, a skewer of barg tenderloin veal, and basmati rice. Served with saffron and grilled tomatoes.',
            picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/a3f47c40948608fa8d50aa286eab1290',
            price: 45,
            currency: 'CAD',
            restaurant_id: result[1]
          },
          {
              name: 'Shishlik',
              description: 'Selected pieces of french lamb rack, marinated in persian spices, grilled on a skewer, and basmati rice. Served with saffron and grilled tomatoes.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/4e6b30e2f508e63504ae1b4a1f2e1a49',
              price: 43,
              currency: 'CAD',
              restaurant_id: result[1]
            },
            {
              name: 'Vaziri Kebob',
              description: 'Combination of chicken breast, ground beef, and basmati rice. Served with saffron and grilled tomatoes.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/3834942a8b5a78ef1020753ea038b3e0',
              price: 36,
              currency: 'CAD',
              restaurant_id: result[1]
            },
            {
              name: 'Kashkeh Bademjan',
              description: 'A medley of mashed fried egplant with creamy yogurt sauce, flavoured with garlic, mint, Persian whey, and topped with crispy onion.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/96ed24ded2555add0e30b791839aba95',
              price: 14,
              currency: 'CAD',
              restaurant_id: result[1]
            },
            {
              name: 'High Priest',
              description: 'This burger features two juicy beef patties.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/477be492cfb75a9ed961a3b1af8b976b',
              price: 11.99,
              currency: 'CAD',
              restaurant_id: result[2]
            },
            {
              name: 'The Token',
              description: 'Buffalo chicken, blue chee',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/5e61db0db043316e765bebafc16aa885',
              price: 8.39,
              currency: 'CAD',
              restaurant_id: result[2]
            },
            {
              name: 'Cheeseburger',
              description: 'Premium beef patty with cheese.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/ee77492e6d105e36634234f1a0e51eb8',
              price: 6.95,
              currency: 'CAD',
              restaurant_id: result[2]
            },
            {
              name: 'Bacon Cheeseburger',
              description: 'Cheeseburger topped with crisp bacon.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/3d8d7286494e303a1d7e1652a0850474',
              price: 8.75,
              currency: 'CAD',
              restaurant_id: result[2]
            },
            {
              name: 'Nathan\'s Hot Dog',
              description: 'Str8 up Nathan\'s hot dog.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e0cfca773339e40af241513eee8f1ccd',
              price: 4.07,
              currency: 'CAD',
              restaurant_id: result[2]
            },
            {
              name: 'Chili Cheese Fries',
              description: 'Fresh cut fries topped with homemade chili and shredded cheese.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/2cf9aabfb4664ed85039a01f80bdbdde',
              price: 7.19,
              currency: 'CAD',
              restaurant_id: result[2]
            },
            {
              name: 'Classic Quarter Chicken Dinner',
              description: 'Enjoy a quarter of our famous slow roasted rotisserie chicken with our Signature Chalet Dipping Sauce, your choice of side and your choice of roll.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/cb6735a56945fe5c53a871560ef28546',
              price: 11.29,
              currency: 'CAD',
              restaurant_id: result[3]
            },
            {
              name: '1/3 Rack BBQ Side Ribs',
              description: 'Fall-off-the-bone pork Side Ribs glazed with our smoky BBQ sauce and grilled to perfection. Served with creamy coleslaw, white or multigrain roll, and choice of side.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/d0394641dae744a0a992c45258d8b8d9',
              price: 16.49,
              currency: 'CAD',
              restaurant_id: result[3]
            },
            {
              name: 'Rotisserie Beef Dinner',
              description: ' Our Rotisserie Beef served with your choice of side, a medley of garden vegetables, your choice of roll, and a side of creamed horseradish.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/e1bdbe7930d301da466f2b6f91665cfc',
              price: 17.49,
              currency: 'CAD',
              restaurant_id: result[3]
            },
            {
              name: 'Family Pak',
              description: 'A whole Rotisserie Chicken served with your choice of 4 individual sides, your choice of 4 rolls, and 12 oz Signature Chalet dipping sauce.',
              picture: 'https://duyt4h9nfnj50.cloudfront.net/sku/8109f3d0d427bbb0e5ee6a17574026d7',
              price: 32.99,
              currency: 'CAD',
              restaurant_id: result[3]
            },

          ])
        ])
      })
};
