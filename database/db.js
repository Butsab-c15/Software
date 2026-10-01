require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ego_db",
  port: process.env.DB_PORT || 3306,

  ssl: {
    rejectUnauthorized: false,
  },
});



db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("MySQL connected successfully!");
  connection.release();

  db.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
    `,
    (createErr) => {
      if (createErr) {
        console.error("Users table setup failed:", createErr.message);
        return;
      }

      db.query(
        "SHOW COLUMNS FROM users LIKE 'password_hash'",
        (checkErr, columns) => {
          if (checkErr) {
            console.error("Password column check failed:", checkErr.message);
            return;
          }

          if (columns.length === 0) {
            db.query(
              "ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NULL AFTER email",
              (alterErr) => {
                if (alterErr) {
                  console.error(
                    "Password column setup failed:",
                    alterErr.message,
                  );
                  return;
                }

                console.log("password_hash column added successfully!");
              },
            );
          } else {
            console.log("password_hash column already exists.");
          }
        },
      );
    },
  );
});

module.exports = db;
