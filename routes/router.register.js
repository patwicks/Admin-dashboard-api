const router = require("express").Router();

const { REGISTER_NEW_ADMIN } = require("../controllers/controller.register");

router.post("/register", REGISTER_NEW_ADMIN);

module.exports = router;
