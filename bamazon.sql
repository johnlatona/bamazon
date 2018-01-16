DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(30),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Star Wars Complete Saga", "Entertainment/Movies", 109.25, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung QLED 65inch TV", "Electronics", 1799.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire and Fury: Inside the Trump White House", "Books", 14.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 8 Case", "Cell Phones and Accessories", 21.99, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Javascript and jQuery", "Books", 39.99, 43);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo Dot", "Electronics", 49.99, 58);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grand Theft Auto V", "Entertainment/Games", 59.99, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Men's Running Shoe", "Men's Shoes", 79.95, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VIVA Office Chair", "Furniture", 89.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple TV", "Electronics", 99.99, 40);