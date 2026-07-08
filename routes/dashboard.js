const express = require("express");
const router = express.Router();
router.route("/").get((req, res, next) => {
  res.locals.pageData = {
    title: "Dashboard Page",
  };
  res.render("pages/dashboard");
});
router.route("/logout").get((req, res, next) => {
  res.redirect("/login");
});
module.exports = router;
