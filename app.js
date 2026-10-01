const express = require("express");
const path = require("path");
const createError = require("http-errors");

const app = express();

const port = 3000;

// =====================================================
// DATABASE
// =====================================================

const db = require("./database/db");

// =====================================================
// ROUTERS
// =====================================================

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const dashboardRouter = require("./routes/dashboard");
const shopRouter = require("./routes/shop");

// =====================================================
// VIEW ENGINE
// =====================================================

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view options", {
  delimiter: "?",
});

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.static(path.join(__dirname, "public")));

// =====================================================
// MAIN ROUTES
// =====================================================

app.use("/", indexRouter);

app.use("/login", loginRouter);

app.use("/register", registerRouter);

app.use("/me", dashboardRouter);

app.use("/shop", shopRouter);

// =====================================================
// FAVORITES / WISHLIST
// =====================================================
//
// favorites
//
// id
// user_id
// product_id
// created_at
//
// 1 user สามารถกดใจสินค้าหลายรายการ
// แต่สินค้าเดียวกันจะกดซ้ำไม่ได้
//
// =====================================================

// =====================================================
// HELPER: หา USER ID
// =====================================================
//
// ระบบ Login ปัจจุบันของโปรเจกต์เก็บ userData / userEmail
// ไว้ใน localStorage
//
// Frontend จะต้องส่ง:
//
// X-User-Id: 5
//
// หรือส่งผ่าน:
//
// body.user_id
// query.user_id
//
// =====================================================

function getUserId(req) {
  const userId =
    req.headers["x-user-id"] || req.body?.user_id || req.query?.user_id;

  if (!userId) {
    return null;
  }

  const id = Number(userId);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

// =====================================================
// CREATE FAVORITES TABLE
// =====================================================

async function createFavoritesTable() {
  try {
    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,

        user_id INT NOT NULL,

        product_id INT NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        UNIQUE KEY unique_user_product (user_id, product_id),

        CONSTRAINT fk_favorites_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_favorites_product
          FOREIGN KEY (product_id)
          REFERENCES products(id)
          ON DELETE CASCADE

      ) ENGINE=InnoDB;
    `);

    console.log("Favorites table ready!");
  } catch (error) {
    console.error("Favorites table setup failed:", error.message);
  }
}

// =====================================================
// GET FAVORITES
// =====================================================
//
// GET /api/favorites
//
// ดึงรายการที่ user คนปัจจุบันกดใจ
//
// =====================================================

app.get("/api/favorites", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "กรุณา Login ก่อน",
      });
    }

    const [rows] = await db.promise().query(
      `
        SELECT
          f.id AS favorite_id,
          f.user_id,
          f.product_id,
          f.created_at,

          p.id,
          p.brand,
          p.name,
          p.price,
          p.size,
          p.condition_percent,
          p.badge_color,
          p.image

        FROM favorites f

        INNER JOIN products p
          ON f.product_id = p.id

        WHERE f.user_id = ?

        ORDER BY f.created_at DESC
      `,
      [userId],
    );

    return res.json({
      success: true,
      favorites: rows,
    });
  } catch (error) {
    console.error("Get favorites error:", error);

    return res.status(500).json({
      success: false,
      message: "ไม่สามารถโหลดรายการที่ชอบได้",
    });
  }
});

// =====================================================
// CHECK FAVORITE
// =====================================================
//
// GET /api/favorites/:productId
//
// ตรวจสอบว่าสินค้านี้ถูก user กดใจหรือยัง
//
// =====================================================

app.get("/api/favorites/:productId", async (req, res) => {
  try {
    const userId = getUserId(req);

    const productId = Number(req.params.productId);

    if (!userId) {
      return res.json({
        success: true,
        liked: false,
      });
    }

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID ไม่ถูกต้อง",
      });
    }

    const [rows] = await db.promise().query(
      `
        SELECT id
        FROM favorites

        WHERE user_id = ?
          AND product_id = ?

        LIMIT 1
      `,
      [userId, productId],
    );

    return res.json({
      success: true,
      liked: rows.length > 0,
    });
  } catch (error) {
    console.error("Check favorite error:", error);

    return res.status(500).json({
      success: false,
      liked: false,
    });
  }
});

// =====================================================
// ADD FAVORITE
// =====================================================
//
// POST /api/favorites/:productId
//
// เพิ่มสินค้าเข้า Favorites
//
// =====================================================

app.post("/api/favorites/:productId", async (req, res) => {
  try {
    const userId = getUserId(req);

    const productId = Number(req.params.productId);

    // -------------------------------------------------
    // ตรวจสอบ Login
    // -------------------------------------------------

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "กรุณา Login ก่อน",
      });
    }

    // -------------------------------------------------
    // ตรวจสอบ Product ID
    // -------------------------------------------------

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID ไม่ถูกต้อง",
      });
    }

    // -------------------------------------------------
    // ตรวจสอบว่าสินค้ามีอยู่จริง
    // -------------------------------------------------

    const [products] = await db.promise().query(
      `
        SELECT id
        FROM products

        WHERE id = ?

        LIMIT 1
      `,
      [productId],
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบสินค้า",
      });
    }

    // -------------------------------------------------
    // เพิ่ม Favorite
    // -------------------------------------------------
    //
    // INSERT IGNORE
    //
    // ป้องกัน user เดิม
    // กดสินค้าชิ้นเดิมซ้ำ
    //
    // UNIQUE KEY:
    //
    // (user_id, product_id)
    //
    // -------------------------------------------------

    await db.promise().query(
      `
        INSERT IGNORE INTO favorites
        (
          user_id,
          product_id
        )

        VALUES (?, ?)
      `,
      [userId, productId],
    );

    return res.json({
      success: true,
      liked: true,
      message: "เพิ่มในรายการที่ชอบแล้ว",
    });
  } catch (error) {
    console.error("Add favorite error:", error);

    return res.status(500).json({
      success: false,
      message: "ไม่สามารถเพิ่มรายการที่ชอบได้",
    });
  }
});

// =====================================================
// REMOVE FAVORITE
// =====================================================
//
// DELETE /api/favorites/:productId
//
// ลบสินค้าออกจาก Favorites
//
// =====================================================

app.delete("/api/favorites/:productId", async (req, res) => {
  try {
    const userId = getUserId(req);

    const productId = Number(req.params.productId);

    // -------------------------------------------------
    // ตรวจสอบ Login
    // -------------------------------------------------

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "กรุณา Login ก่อน",
      });
    }

    // -------------------------------------------------
    // ตรวจสอบ Product ID
    // -------------------------------------------------

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID ไม่ถูกต้อง",
      });
    }

    // -------------------------------------------------
    // ลบเฉพาะของ USER คนนี้
    // -------------------------------------------------

    await db.promise().query(
      `
        DELETE FROM favorites

        WHERE user_id = ?
          AND product_id = ?
      `,
      [userId, productId],
    );

    return res.json({
      success: true,
      liked: false,
      message: "นำออกจากรายการที่ชอบแล้ว",
    });
  } catch (error) {
    console.error("Remove favorite error:", error);

    return res.status(500).json({
      success: false,
      message: "ไม่สามารถลบรายการที่ชอบได้",
    });
  }
});

// =====================================================
// GET SINGLE USER FAVORITES
// =====================================================
//
// GET /api/users/:userId/favorites
//
// ใช้สำหรับดู Favorites ของ user โดยตรง
//
// =====================================================

app.get("/api/users/:userId/favorites", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "User ID ไม่ถูกต้อง",
      });
    }

    const [rows] = await db.promise().query(
      `
        SELECT
          f.id AS favorite_id,
          f.user_id,
          f.product_id,
          f.created_at,

          p.id,
          p.brand,
          p.name,
          p.price,
          p.size,
          p.condition_percent,
          p.badge_color,
          p.image

        FROM favorites f

        INNER JOIN products p
          ON f.product_id = p.id

        WHERE f.user_id = ?

        ORDER BY f.created_at DESC
      `,
      [userId],
    );

    return res.json({
      success: true,
      favorites: rows,
    });
  } catch (error) {
    console.error("Get user favorites error:", error);

    return res.status(500).json({
      success: false,
      message: "ไม่สามารถโหลดรายการที่ชอบได้",
    });
  }
});

// =====================================================
// CART
// =====================================================

app.get("/cart", (req, res) => {
  res.render("pages/cart", {
    pageData: {
      title: "Cart - Sneaker2Hand",
    },
  });
});

// =====================================================
// CHECKOUT
// =====================================================

app.get("/checkout", (req, res) => {
  res.render("pages/checkout", {
    pageData: {
      active: "checkout",
      title: "Checkout - Sneaker2Hand",
    },
  });
});

app.get("/checkout/:id", (req, res) => {
  res.render("pages/checkout", {
    pageData: {
      active: "checkout",
      title: "Checkout - Sneaker2Hand",
    },
  });
});

// =====================================================
// QR PAYMENT
// =====================================================

app.get("/qr-payment", (req, res) => {
  res.render("pages/qr-payment", {
    pageData: {
      active: "checkout",
      title: "QR Payment - Sneaker2Hand",
    },
  });
});

// =====================================================
// 404
// =====================================================

app.use(function (req, res, next) {
  const err = createError(404);

  next(err);
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use(function (err, req, res, next) {
  res.locals.pageData = {
    title: "Error Page",
  };

  res.locals.message = err.message;

  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  res.render("pages/error");
});

// =====================================================
// START SERVER
// =====================================================

async function startServer() {
  // สร้างตาราง favorites ก่อนเปิด server
  await createFavoritesTable();

  app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });
}

startServer();

// =====================================================
// EXPORT
// =====================================================

module.exports = app;
