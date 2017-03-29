CREATE TABLE resturants (
  id  SERIAL PRIMARY KEY NOT NULL ,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  food_type VARCHAR(50) NOT NULL
);

CREATE TABLE foods (
  id  SERIAL PRIMARY KEY NOT NULL ,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  picture TEXT,
  price INTEGER
);

CREATE TABLE carts (
  id  SERIAL PRIMARY KEY NOT NULL ,
  user_id INTEGER NOT NULL
);

CREATE TABLE cartsfoods (
  id  SERIAL PRIMARY KEY NOT NULL ,
  food_id INTEGER NOT NULL,
  cart_id INTEGER NOT NULL
);

CREATE TABLE order (
  id  SERIAL PRIMARY KEY NOT NULL ,
  phone INTEGER NOT NULL,
  cart_id
);

CREATE TABLE user (
  id  SERIAL PRIMARY KEY NOT NULL ,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
)

INSERT INTO resturants (name, location, food_type) VALUES ('Urawa Sushi', ' 254 Adelaide Street West, Toronto, ON M5H 1X6', 'Japanese');

INSERT INTO foods (name, description, picture, price)
  VALUES ('Sandwich Roll', 'Spicy tuna, spicy salmon, crabmeat, avocado, and egg with special sauce on top.',
  'https://duyt4h9nfnj50.cloudfront.net/sku/8f982783aaff08d52a26669bf35b633a', 14.95);
INSERT INTO foods (name, description, picture, price)
  VALUES ('Salmon Lover', '6 pieces of salmon sushi, 6 pieces of salmon sashimi, 6 pieces of spicy salmon roll, 1 piece of spicy salmon hand roll, and 1 piece of salmon hand roll. Served with soup and salad.',
  'https://duyt4h9nfnj50.cloudfront.net/sku/8e28bcce1415994e2029d9f7ec868075', 25.99);
INSERT INTO foods (name, description, picture, price)
  VALUES ('Teriyaki', 'Served with soup, salad, rice, and vegetables.',
  'https://duyt4h9nfnj50.cloudfront.net/sku/e0cfca773339e40af241513eee8f1ccd', 14.5);
INSERT INTO foods (name, description, picture, price)
  VALUES ('Coconut Shrimp', 'Served with soup',
  'https://duyt4h9nfnj50.cloudfront.net/sku/e3e98b6c11ddaf328a0e25061be4b87b', 14.95);
INSERT INTO foods (name, description, picture, price)
  VALUES ('Cherry Blossom Roll', 'Deep-fried roll with spicy tuna and avocado inside, topped with crabmeat and special sauce.',
  'https://duyt4h9nfnj50.cloudfront.net/sku/aa831f80a4bddfb509359c62043b4749', 12.95);
INSERT INTO foods (name, description, picture, price)
  VALUES ('Chicken Teriyaki', 'Served with soup',
  'https://duyt4h9nfnj50.cloudfront.net/sku/e0cfca773339e40af241513eee8f1ccd', 7.95);








