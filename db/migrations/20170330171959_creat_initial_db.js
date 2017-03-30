exports.up = function(knex, Promise) {


  return Promise.all([
  knex.schema
    .createTable('restaurants', function(table){
      table.increments('id').notNull().primary();
      table.string('name').notNull();
      table.string('location').notNull();
      table.string('food_type').notNull();
    })
    .createTable('foods',function(table){
      table.increments('id').notNull().primary();
      table.string('name').notNull();
      table.string('description');
      table.string('picture');
      table.decimal('price').notNull();
      table.string('currency').notNull();
      table.integer('restaurant_id').notNull().references('id').inTable('restaurants');

    })
    .createTable('users',function(table){
      table.increments('id').notNull().primary();
      table.string('username').notNull();
      table.string('password').notNull();
      table.string('email').notNull();
    })
    .createTable('carts',function(table){
      table.increments('id').notNull().primary();
      table.integer('user_id').notNull().references('id').inTable('users');
    })
    .createTable('cartsfoods',function(table){
      table.increments('id').notNull().primary();
      table.integer('food_id').notNull().references('id').inTable('foods');
      table.integer('cart_id').notNull().references('id').inTable('carts');
    })
    .createTable('orders',function(table){
      table.increments('id').notNull().primary();
      table.integer('phone').notNull();
      table.integer('cart_id').notNull().references('id').inTable('carts');
      table.integer('user_id').notNull().references('id').inTable('users');

    })


]);
}
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema
        .dropTable('orders')
        .dropTable('cartsfoods')
        .dropTable('carts')
        .dropTable('users')
        .dropTable('foods')
        .dropTable('restaurants')


    ])
  };

