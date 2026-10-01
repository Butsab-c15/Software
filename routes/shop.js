const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Shop listing: DB-backed version of the Demo filters.
router.get("/", async (req, res, next) => {
  try {
    const currentBrand = req.query.brand || "all";
    const currentSize = req.query.size || "all";
    const currentCondition = req.query.condition || "all";
    const currentPrice = req.query.price || "all";
    const currentSearch = (req.query.q || "").trim();

    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (currentSearch) {
      sql += " AND (name LIKE ? OR brand LIKE ?)";
      const keyword = `%${currentSearch}%`;
      params.push(keyword, keyword);
    }

    if (currentBrand !== "all") {
      sql += " AND LOWER(brand) = ?";
      params.push(currentBrand.toLowerCase());
    }

    if (currentSize !== "all") {
      const selectedSize = parseFloat(currentSize);
      if (!Number.isNaN(selectedSize)) {
        sql += " AND size = ?";
        params.push(selectedSize);
      }
    }

    switch (currentCondition) {
      case "90-100": sql += " AND condition_percent BETWEEN 90 AND 100"; break;
      case "80-89": sql += " AND condition_percent BETWEEN 80 AND 89"; break;
      case "70-79": sql += " AND condition_percent BETWEEN 70 AND 79"; break;
      case "below-70": sql += " AND condition_percent < 70"; break;
    }

    switch (currentPrice) {
      case "under-1000": sql += " AND price < 1000"; break;
      case "1000-2000": sql += " AND price >= 1000 AND price <= 2000"; break;
      case "2000-3000": sql += " AND price > 2000 AND price <= 3000"; break;
      case "3000-plus": sql += " AND price > 3000"; break;
    }

    sql += " ORDER BY id ASC";
    const [rows] = await db.promise().query(sql, params);

    res.render("pages/shop", {
      products: rows,
      selectedBrand: currentBrand,
      selectedSize: currentSize,
      selectedCondition: currentCondition,
      selectedPrice: currentPrice,
      selectedSearch: currentSearch,
      pageData: { title: "Shop - Sneaker2Hand", active: "shop" },
    });
  } catch (error) {
    next(error);
  }
});

async function renderProduct(req, res, next) {
  try {
    const productId = req.params.id;
    if (!/^\d+$/.test(productId)) {
      return res.status(404).render("pages/error", {
        pageData: { title: "Product Not Found" },
        message: "ไม่พบสินค้านี้", error: {},
      });
    }

    const [rows] = await db.promise().query(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );

    if (!rows.length) {
      return res.status(404).render("pages/error", {
        pageData: { title: "Product Not Found" },
        message: "ไม่พบสินค้านี้", error: {},
      });
    }

    const product = rows[0];
    res.render("pages/product", {
      product,
      pageData: { title: `${product.name} - Sneaker2Hand`, active: "shop" },
    });
  } catch (error) {
    next(error);
  }
}

// Demo-compatible URLs: /shop/product/1 and /shop/1
router.get("/product/:id", renderProduct);
router.get("/:id", renderProduct);

module.exports = router;
