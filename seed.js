const db = require("./database/db");
const mockShoes = require("./data/mockShoes");

async function seedDatabase() {
  try {
    console.log("เริ่มเพิ่มข้อมูลสินค้า...");

    for (const shoe of mockShoes) {
      const price = Number(String(shoe.price).replace(/,/g, ""));

      await db.promise().query(
        `
        INSERT INTO products
        (
          id,
          brand,
          name,
          price,
          size,
          condition_percent,
          badge_color,
          image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          shoe.id,
          shoe.brand,
          shoe.name,
          price,
          shoe.size,
          shoe.condition,
          shoe.badgeColor,
          shoe.image,
        ],
      );
    }

    console.log("เพิ่มข้อมูลสินค้าสำเร็จ!");
    process.exit();
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    process.exit(1);
  }
}

seedDatabase();
