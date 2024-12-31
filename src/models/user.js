const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: String,
  email: String,
  city: String,
});

const User = model("user", userSchema);

module.exports = User;
