const connection = require("../configs/database");
const getAllUser = async () => {
  const [rows, fields] = await connection.query("SELECT * FROM Users");
  return rows;
};
const getUserById = async (id) => {
  const [rows, fields] = await connection.query(
    "SELECT * FROM Users WHERE id = ?",
    [id]
  );
  if (rows.length === 0) {
    return {};
  }
  return rows[0];
};
const createUser = async (email, name, city) => {
  const results = await connection.query(
    "INSERT INTO Users (email, name, city) VALUES (?, ?, ?)",
    [email, name, city]
  );
  return results;
};
const updateUser = async (email, name, city, id) => {
  const results = await connection.query(
    "UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?",
    [email, name, city, id]
  );
  return results;
};
const deleteUser = async (id) => {
  const results = await connection.query("DELETE FROM Users WHERE id = ?", [
    id,
  ]);
  return results;
};
module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
