const connection = require("../configs/database");
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/CRUDService");
const User = require("../models/User");
const getHomepage = async (req, res) => {
  let rows = await User.find({});
  return res.render("home.ejs", { users: rows });
};
const getEditPage = async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id).exec();
  return res.render("edit.ejs", { user });
};
const getCreateUser = (req, res) => {
  res.render("create.ejs");
};

const postCreateUser = async (req, res) => {
  let { email, name, city } = req.body;
  await User.create({ email, name, city });

  // let [results, fields] = await createUser(email, name, city);
  res.redirect("/");
};
const patchUpdateUser = async (req, res) => {
  let { email, name, city, id } = req.body;
  await User.updateOne({ _id: id }, { email, name, city }).exec();
  res.redirect("/");
};
const deleteUserById = async (req, res) => {
  let id = req.params.id;
  let respresp = await User.deleteOne({ _id: id });
  res.redirect("/");
};
module.exports = {
  getHomepage,
  getCreateUser,
  postCreateUser,
  getEditPage,
  patchUpdateUser,
  deleteUserById,
};
