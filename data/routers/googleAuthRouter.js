const router = require("express").Router();

const login = require("../../middlewares/login");
const auth = require("../../middlewares/auth");

router.get("/login", login, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/check", auth, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/logout", (req, res) => {
  const prod = process.env.DB_ENV === "production";

  res.clearCookie("token");
  res.status(200).end();
});

module.exports = router;
