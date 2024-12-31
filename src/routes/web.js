const express = require("express");
const router = express.Router();
const {
  getHomepage,
  postCreateUser,
  getCreateUser,
  getEditPage,
  patchUpdateUser,
  deleteUserById,
} = require("../controllers/homeController");

//router.get("/route", controller);
router.get("/", getHomepage);
router.get("/create", getCreateUser);
router.get("/user/:id", getEditPage);
router.post("/create-user", postCreateUser);
router.post("/update/:id", patchUpdateUser);
router.get("/delete/:id", deleteUserById);

module.exports = router;
