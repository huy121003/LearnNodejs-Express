const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getABC,
  getHome,
  getSample,
} = require("../controllers/homeController");

//router.get("/route", controller);
router.get("/", getHomepage);
router.get("/abc", getABC);

router.get("/home", getHome);
router.get("/sample", getSample);
module.exports = router;
