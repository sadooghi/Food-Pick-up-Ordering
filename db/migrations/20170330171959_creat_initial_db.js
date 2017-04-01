exports.up = function(knex, Promise) {


  return Promise.all([
  knex.schema
    .createTable('restaurants', function(table){
      table.increments('id').notNullable().primary();
      table.string('name').notNullable();
      table.string('location').notNullable();
      table.string('food_type').notNullable();
    })
    .createTable('foods',function(table){
      table.increments('id').notNullable().primary();
      table.string('name').notNullable();
      table.string('description');
      table.string('picture');
      table.decimal('price').notNullable();
      table.string('currency').notNullable();
      table.integer('restaurant_id').notNullable().references('id').inTable('restaurants');

    })
    .createTable('users',function(table){
      table.increments('id').notNullable().primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
    })
    .createTable('carts',function(table){
      table.increments('id').notNullable().primary();
      table.integer('user_id').notNullable().references('id').inTable('users');
    })
    .createTable('cartsfoods',function(table){
      table.increments('id').notNullable().primary();
      table.integer('food_id').notNullable().references('id').inTable('foods');
      table.integer('cart_id').notNullable().references('id').inTable('carts');
    })
    .createTable('orders',function(table){
      table.increments('id').notNullable().primary();
      table.integer('phone').notNullable();
      table.integer('cart_id').notNullable().references('id').inTable('carts');
      table.integer('user_id').notNullable().references('id').inTable('users');

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

