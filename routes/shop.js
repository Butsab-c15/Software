const express = require("express");
const router = express.Router();
const db = require("../database/db");

// หน้าแสดงรายการสินค้า (Shop)==> ของข้อมูลจากฐานข้อมูลและส่งไปยัง shop.ejs ของแบม
router.get("/", async (req, res) => {
  try {
    const currentBrand = req.query.brand || "all";
    const currentSize = req.query.size || "all";
    const currentCondition = req.query.condition || "all";
    const currentPrice = req.query.price || "all";

    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    // =========================
    // FILTER BRAND
    // =========================

    if (currentBrand !== "all") {
      sql += " AND brand = ?";
      params.push(currentBrand.toLowerCase());
    }

    // =========================
    // FILTER SIZE
    // =========================

    if (currentSize !== "all") {
      const selectedSize = parseFloat(currentSize);

      if (!isNaN(selectedSize)) {
        sql += " AND size = ?";
        params.push(selectedSize);
      }
    }

    // =========================
    // FILTER CONDITION
    // =========================

    switch (currentCondition) {
      case "90-100":
        sql += " AND condition_percent BETWEEN 90 AND 100";
        break;

      case "80-89":
        sql += " AND condition_percent BETWEEN 80 AND 89";
        break;

      case "70-79":
        sql += " AND condition_percent BETWEEN 70 AND 79";
        break;

      case "below-70":
        sql += " AND condition_percent < 70";
        break;
    }

    // =========================
    // FILTER PRICE
    // =========================

    switch (currentPrice) {
      case "under-1000":
        sql += " AND price < 1000";
        break;

      case "1000-2000":
        sql += " AND price BETWEEN 1000 AND 2000";
        break;

      case "2000-3000":
        sql += " AND price > 2000 AND price <= 3000";
        break;

      case "3000-plus":
        sql += " AND price > 3000";
        break;
    }

    // =========================
    // QUERY DATABASE
    // =========================

    const [rows] = await db.promise().query(sql, params);

    // =========================
    // ส่งข้อมูลไป shop.ejs
    // =========================

    res.render("pages/shop", {
      products: rows,

      selectedBrand: currentBrand,
      selectedSize: currentSize,
      selectedCondition: currentCondition,
      selectedPrice: currentPrice,

      pageData: {
        title: "Shop - Sneaker2Hand",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;