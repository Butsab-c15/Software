require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

async function importDatabase() {
  let connection;

  try {
    console.log("Connecting to Aiven...");

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      multipleStatements: true,
    });

    console.log("Connected to Aiven successfully!");

    const sql = fs.readFileSync("C:\\Pr\\Software\\ego_db_backup.sql", "utf8");

    console.log("SQL file loaded.");
    console.log("Importing database...");

    await connection.query(sql);

    console.log("=================================");
    console.log("Import completed successfully!");
    console.log("=================================");
  } catch (err) {
    console.error("Import failed:");
    console.error(err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

importDatabase();
