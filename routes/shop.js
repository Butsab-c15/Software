const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  // ดึงค่า brand จาก URL query (ถ้าไม่มีให้ค่าเริ่มต้นเป็น 'all')
  const currentBrand = req.query.brand || "all";

  res.locals.pageData = {
    title: "Shop",
    currentBrand: currentBrand, // เพิ่มค่านี้เข้าไป
  };

  res.render("pages/shop");
});

module.exports = router;
