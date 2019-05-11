DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(25) NULL,  
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Avocados", "Produce", 1.25, 25);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Milk", "Dairy", 4.99, 17);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Ground Beef", "Meat", 5.99, 14);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Pork Chops", "Meat", 6.99, 5);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Tortilla Chips", "Grocery", 3.99, 17);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Lunch Meat", "Deli", 6.99, 5);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Rolls", "Bakery", 4.99, 2);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Yogurt", "Dairy", 2.99, 18);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Birthday Cards", "General Merchandise", 4.99, 89);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Raspberries", "Produce", 3.99, 14);

SELECT * FROM products;