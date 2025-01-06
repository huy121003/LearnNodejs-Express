const express = require("express");
const routerApi = express.Router();
const {
  getUserApi,
  getUserByIdApi,
  createUserApi,
  updateUserApi,
  deleteUserByIdApi,
  postUploadFile,
  postUploadMultipleFiles,
} = require("../controllers/apiController");
const {
  createCustomerApi,
  createArrayCustomerApi,
  getAllCustomerApi,
  updateCustomerApi,
  softDeleteCustomerApi,
  softDeleteArrayCustomerApi,
} = require("../controllers/customerController");
//router.get("/route", controller);
routerApi.get("/users/", getUserApi);
routerApi.get("/users/:id", getUserByIdApi);
routerApi.post("/users/", createUserApi);
routerApi.patch("/users/", updateUserApi);
routerApi.delete("/users/:id", deleteUserByIdApi);

routerApi.post("/file", postUploadFile);
routerApi.post("/files", postUploadMultipleFiles);

routerApi.post("/customers", createCustomerApi);
routerApi.post("/customers-many", createArrayCustomerApi);
routerApi.get("/customers", getAllCustomerApi);
routerApi.patch("/customers", updateCustomerApi);
routerApi.delete("/customers/:id", softDeleteCustomerApi);
routerApi.delete("/customers-many", softDeleteArrayCustomerApi);
module.exports = routerApi;
