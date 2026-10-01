const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const db = require("../database/db");
const { validation } = require("../validator/register");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

router
  .route("/")
  .all((req, res, next) => {
    res.locals.pageData = { title: "Register Page - EGO" };
    res.locals.user = {
      name: "", email: "", password: "", confirm_password: "",
    };
    req.renderPage = "pages/register";
    const query = new URLSearchParams(req.query).toString();
    res.locals.registerAction = "/register" + (query ? "?" + query : "");
    next();
  })
  .get((req, res) => {
    res.render("pages/register");
  })
  .post(validation(), async (req, res) => {
    const { name, email, password } = req.body;
    const redirectUrl = req.query.redirect;
    const action = req.query.action;

    try {
      const [existing] = await db.promise().query(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [email]
      );

      if (existing.length > 0) {
        res.locals.errors = { message: "Email นี้มีบัญชีอยู่แล้ว" };
        res.locals.user = { name, email, password: "", confirm_password: "" };
        return res.render("pages/register");
      }

      const passwordHash = hashPassword(password);

      await db.promise().query(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
      );

      let target = "/login";
      const params = new URLSearchParams();
      if (redirectUrl) params.set("redirect", redirectUrl);
      if (action) params.set("action", action);
      const query = params.toString();
      if (query) target += `?${query}`;

      res.redirect(target);
    } catch (err) {
      console.error("Register error:", err);
      res.locals.errors = { message: "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง" };
      res.locals.user = { name, email, password: "", confirm_password: "" };
      return res.render("pages/register");
    }
  });

module.exports = router;
