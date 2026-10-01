const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const db = require("../database/db");
const { validation } = require("../validator/users");

/* =========================================================
   VERIFY PASSWORD
========================================================= */

function verifyPassword(password, storedValue) {
  if (!storedValue || !storedValue.includes(":")) {
    return false;
  }

  const [salt, storedHash] = storedValue.split(":");

  const derivedHash = crypto.scryptSync(password, salt, 64).toString("hex");

  const a = Buffer.from(storedHash, "hex");

  const b = Buffer.from(derivedHash, "hex");

  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/* =========================================================
   SAFE REDIRECT
========================================================= */

function getSafeRedirect(redirectUrl) {
  /*
   * ไม่มี redirect
   */

  if (!redirectUrl || typeof redirectUrl !== "string") {
    return null;
  }

  /*
   * ต้องเป็น URL ภายในเว็บไซต์
   *
   * อนุญาต:
   *
   * /shop
   * /shop/2
   * /shop/2?action=wishlist
   *
   */

  if (!redirectUrl.startsWith("/")) {
    return null;
  }

  /*
   * ป้องกัน external URL
   *
   * เช่น:
   *
   * //google.com
   *
   */

  if (redirectUrl.startsWith("//")) {
    return null;
  }

  return redirectUrl;
}

/* =========================================================
   LOGIN
========================================================= */

router
  .route("/")

  /* =======================================================
     GET /login
  ======================================================== */

  .all((req, res, next) => {
    res.locals.pageData = {
      title: "Login Page",
    };

    res.locals.user = {
      email: "",
      password: "",
    };

    req.renderPage = "pages/login";

    /* =====================================================
       จำหน้าที่ผู้ใช้มาก่อน Login
    ====================================================== */

    let redirectUrl = req.query.redirect;

    /*
     * ถ้าไม่มี redirect
     * ให้ลองใช้ Referer
     */

    if (!redirectUrl) {
      const referer = req.get("referer");

      if (referer) {
        try {
          const ref = new URL(referer);

          /*
           * รับเฉพาะ URL ของเว็บเรา
           */

          if (ref.host === req.get("host")) {
            redirectUrl = ref.pathname + ref.search;
          }
        } catch (err) {
          /*
           * Referer ไม่ถูกต้อง
           */

          redirectUrl = null;
        }
      }
    }

    /*
     * ตรวจสอบ redirect
     */

    redirectUrl = getSafeRedirect(redirectUrl);

    /* =====================================================
       สร้าง URL สำหรับ Login Form
    ====================================================== */

    const loginParams = new URLSearchParams();

    if (redirectUrl) {
      loginParams.set("redirect", redirectUrl);
    }

    if (req.query.action) {
      loginParams.set("action", req.query.action);
    }

    const query = loginParams.toString();

    /*
     * ตัวอย่าง:
     *
     * /login?redirect=%2Fshop%2F2&action=wishlist
     */

    res.locals.loginAction = "/login" + (query ? "?" + query : "");

    next();
  })

  /* =======================================================
     GET LOGIN PAGE
  ======================================================== */

  .get((req, res) => {
    res.render("pages/login");
  })

  /* =======================================================
     POST LOGIN
  ======================================================== */

  .post(
    validation(),

    async (req, res) => {
      const { email, password } = req.body;

      /* ===================================================
         รับ redirect

         รองรับทั้ง:

         req.body.redirect
         req.query.redirect
      ==================================================== */

      let redirectUrl = req.body.redirect || req.query.redirect;

      /* ===================================================
         รับ action

         wishlist
         add
         buy
      ==================================================== */

      const action = req.body.action || req.query.action;

      /*
       * ตรวจสอบ redirect
       */

      redirectUrl = getSafeRedirect(redirectUrl);

      /* ===================================================
         DEFAULT
      ==================================================== */

      let target = redirectUrl || "/";

      /* ===================================================
         เพิ่ม action กลับเข้า URL
      ==================================================== */

      if (redirectUrl && action) {
        const separator = target.includes("?") ? "&" : "?";

        target += `${separator}action=${encodeURIComponent(action)}`;
      }

      try {
        /* =================================================
           ค้นหา User จาก MySQL
        ================================================== */

        const [rows] = await db.promise().query(
          `
                SELECT
                  id,
                  name,
                  email,
                  password_hash

                FROM users

                WHERE email = ?

                LIMIT 1
              `,
          [email],
        );

        /* =================================================
           ตรวจสอบ User / Password
        ================================================== */

        if (
          rows.length === 0 ||
          !verifyPassword(password, rows[0].password_hash)
        ) {
          res.locals.errors = {
            message: "Email หรือ Password ไม่ถูกต้อง",
          };

          res.locals.user = {
            email: email,

            password: "",
          };

          /*
           * ถ้า Login ผิด
           * ต้องรักษา redirect/action เดิมไว้
           */

          const errorParams = new URLSearchParams();

          if (redirectUrl) {
            errorParams.set("redirect", redirectUrl);
          }

          if (action) {
            errorParams.set("action", action);
          }

          const errorQuery = errorParams.toString();

          res.locals.loginAction =
            "/login" + (errorQuery ? "?" + errorQuery : "");

          return res.render("pages/login");
        }

        /* =================================================
           LOGIN สำเร็จ
        ================================================== */

        const user = rows[0];

        /* =================================================
           ข้อมูล User
        ================================================== */

        const loginData = {
          id: user.id,

          name: user.name,

          email: user.email,
        };

        /* =================================================
           ส่งหน้า HTML กลับไป Browser
        ================================================== */

        res.send(`

<!doctype html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <title>
    Login Success
  </title>

</head>

<body>


<script>

  /* =====================================================
     เก็บ Email
  ====================================================== */

  localStorage.setItem(
    "userEmail",
    ${JSON.stringify(user.email)}
  );


  /* =====================================================
     เก็บ User Data
  ====================================================== */

  localStorage.setItem(
    "userData",
    ${JSON.stringify(JSON.stringify(loginData))}
  );


  /* =====================================================
     กลับไปหน้าที่ผู้ใช้มาก่อน Login
  ====================================================== */

  window.location.replace(
    ${JSON.stringify(target)}
  );

</script>


</body>

</html>

        `);
      } catch (err) {
        /* =================================================
           DATABASE / SERVER ERROR
        ================================================== */

        console.error("Login error:", err);

        res.locals.errors = {
          message: "ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูล",
        };

        res.locals.user = {
          email: email,

          password: "",
        };

        /*
         * รักษา redirect/action เดิม
         */

        const errorParams = new URLSearchParams();

        if (redirectUrl) {
          errorParams.set("redirect", redirectUrl);
        }

        if (action) {
          errorParams.set("action", action);
        }

        const errorQuery = errorParams.toString();

        res.locals.loginAction =
          "/login" + (errorQuery ? "?" + errorQuery : "");

        return res.render("pages/login");
      }
    },
  );

/* =========================================================
   EXPORT
========================================================= */

module.exports = router;
