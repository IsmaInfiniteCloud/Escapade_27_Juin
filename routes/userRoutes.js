const express = require("express");
//const session = require("express-session");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/logout", userController.logout);

module.exports = router;
