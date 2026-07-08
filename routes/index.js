const express = require("express");
const router = express.Router();
router.get("/", function (req, res, next) {
  res.locals.pageData = {
    title: "Butsaba Charoenwai",
  };
  res.render("pages/index");
});
module.exports = router;
