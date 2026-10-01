require("dotenv").config();

const mysql = require("mysql2/promise");

async function checkCount() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const tables = ["users", "products", "favorites"];

  for (const table of tables) {
    const [rows] = await db.query(`SELECT COUNT(*) AS total FROM ${table}`);

    console.log(`${table}: ${rows[0].total} rows`);
  }

  await db.end();
}

checkCount();
