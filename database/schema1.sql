-- Sneaker2Hand / EGO database
-- Run this file once in MySQL Workbench before running seed.js

CREATE DATABASE IF NOT EXISTS ego_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ego_db;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  size DECIMAL(4,1) NOT NULL,
  condition_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  badge_color VARCHAR(100) DEFAULT NULL,
  image TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_size ON products(size);
CREATE INDEX idx_products_condition ON products(condition_percent);
CREATE INDEX idx_products_price ON products(price);
