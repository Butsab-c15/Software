require("dotenv").config();

const mysql = require("mysql2/promise");

async function checkDatabase() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    console.log("\nConnected to Aiven successfully!\n");

    const [tables] = await connection.query("SHOW TABLES");

    console.log("===== TABLES IN AIVEN =====");

    if (tables.length === 0) {
      console.log("ไม่พบตารางใน database");
      return;
    }

    for (const row of tables) {
      console.log("✓", Object.values(row)[0]);
    }

    console.log("\nTotal tables:", tables.length);

    console.log("\n===== TABLE DETAILS =====");

    for (const row of tables) {
      const tableName = Object.values(row)[0];

      const [columns] = await connection.query(
        `SHOW COLUMNS FROM \`${tableName}\``,
      );

      console.log(`\n[${tableName}]`);

      for (const column of columns) {
        console.log(
          `  - ${column.Field} | ${column.Type} | ${column.Null} | ${column.Key}`,
        );
      }
    }
  } catch (err) {
    console.error("Database check failed:");
    console.error(err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkDatabase();
