const User = require("../models/User");
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../services/fileService");
const getUserApi = async (req, res) => {
  let rows = await User.find({});
  return res.status(200).json({
    error: 0,
    message: "Success get all user",
    data: rows,
  });
};
const getUserByIdApi = async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id).exec();
  return res.status(200).json({
    errorCode: 0,
    statusCode: 200,
    message: "Success get user by id",
    data: user,
  });
};
const createUserApi = async (req, res) => {
  let { email, name, city } = req.body;
  let user = await User.create({ email, name, city });
  return res.status(201).json({
    errorCodeCode: 0,
    statusCode: 201,
    message: "Success create user",
    data: user,
  });
};
const updateUserApi = async (req, res) => {
  let { email, name, city, id } = req.body;
  let user = await User.updateOne({ _id: id }, { email, name, city });
  return res.status(200).json({
    errorCode: 0,
    statusCode: 200,
    message: "Success update user",
    data: user,
  });
};
const deleteUserByIdApi = async (req, res) => {
  let id = req.params.id;
  await User.deleteOne({ _id: id });
  return res.status(200).json({
    errorCode: 0,
    statusCode: 200,
    message: "Success delete user",
  });
};

const postUploadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (
    req.files.image.mimetype !== "image/jpeg" &&
    req.files.image.mimetype !== "image/png"
  ) {
    return res.status(400).send("File upload not support");
  }
  if (req.files.image.size > 1024 * 1024) {
    return res.status(400).send("File upload not support");
  }
  let result = await uploadSingleFile(req.files.image);

  return res.send(result);
};
const postUploadMultipleFiles = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }
  if (Array.isArray(req.files.image)) {
    let result = await uploadMultipleFiles(req.files.image);
    return res.status(200).json({
      errorCode: 0,
      statusCode: 200,
      message: "Success upload multiple files",
      data: result,
    });
  } else {
    return await postUploadFile(req, res);
  }
};

module.exports = {
  getUserApi,
  getUserByIdApi,
  createUserApi,
  updateUserApi,
  deleteUserByIdApi,
  postUploadFile,
  postUploadMultipleFiles,
};
