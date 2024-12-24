const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getABC,
  getHome,
} = require("../controllers/homeController");

//router.get("/route", controller);
router.get("/", getHomepage);
router.get("/abc", getABC);

router.get("/home", getHome);
module.exports = router;
