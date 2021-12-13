const router = require("express").Router();

const {
  REGISTER_NEW_ADMIN,
  LOGIN_ADMIN,
} = require("../controllers/controller.admin");
const AUTH = require("../middleware/middleware.authentication");

router.post("/register", REGISTER_NEW_ADMIN);
router.post("/login", LOGIN_ADMIN);

module.exports = router;
