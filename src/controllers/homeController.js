const connection = require("../configs/database");
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../services/CRUDService");

const getHomepage = async (req, res) => {
  let rows = await getAllUser();
  return res.render("home.ejs", { users: rows });
};
const getEditPage = async (req, res) => {
  let id = req.params.id;
  let user = await getUserById(id);
  return res.render("edit.ejs", { user });
};
const getCreateUser = (req, res) => {
  res.render("create.ejs");
};

const postCreateUser = async (req, res) => {
  console.log(req.body);
  let { email, name, city } = req.body;

  let [results, fields] = await createUser(email, name, city);
  res.send("Create user successfully!");
};
const patchUpdateUser = async (req, res) => {
  let { email, name, city, id } = req.body;
  let [results, fields] = await updateUser(email, name, city, id);
  res.send("Update user successfully!");
};
const deleteUserById = async (req, res) => {
  let id = req.params.id;
  let [results, fields] = await deleteUser(id);
  res.send("Delete user successfully!");
};
module.exports = {
  getHomepage,
  getCreateUser,
  postCreateUser,
  getEditPage,
  patchUpdateUser,
  deleteUserById,
};
