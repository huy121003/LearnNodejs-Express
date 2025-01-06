const Customer = require("../models/customer");
const { uploadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  updateCustomerService,
  softDeleteCustomerService,
  softDeleteArrayCustomerService,
} = require("../services/customerService");
const {
  pageSizeConfig,
  currentPageConfig,
} = require("../configs/paginationConfig");
const regexQueryConfig = require("../configs/regexQueryConfig");
const aps = require("api-query-params");
module.exports = {
  createCustomerApi: async (req, res) => {
    let imagePath = "";
    let { name, email, phone, address, description } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let result = await uploadSingleFile(req.files.image);
      imagePath = result.data.path;
    }
    let customerData = {
      name,
      email,
      phone,
      address,
      image: imagePath,
      description,
    };
    let customer = await createCustomerService(customerData);
    return res.status(201).json({
      errorCode: 0,
      statusCode: 201,
      message: "Success create customer",
    });
  },
  createArrayCustomerApi: async (req, res) => {
    let customers = req.body.customers;
    // console.log("deded", customers);
    // let result = [];
    // for (let i = 0; i < customers.length; i++) {
    //   let imagePath = "";
    //   if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send("No files were uploaded.");
    //   } else {
    //     let file = req.files.image[i];
    //     let result = await uploadSingleFile(file);
    //     imagePath = result.data.path;
    //   }
    //   let customerData = {
    //     name: customers[i].name,
    //     email: customers[i].email,
    //     phone: customers[i].phone,
    //     address: customers[i].address,
    //     // image: imagePath,
    //     description: customers[i].description,
    //   };
    //   console.log("wwwwwdeded", customerData);
    // }
    let customer = await createArrayCustomerService(customers);
    return res.status(201).json({
      errorCode: 0,
      statusCode: 201,
      message: "Success create customers",
      data: customer,
    });
  },
  getAllCustomerApi: async (req, res) => {
    let customers = await getAllCustomerService(req.query);
    // let totalCustomers = (await Customer.find()).length;
    return res.status(200).json({
      errorCode: 0,
      statusCode: 200,
      message: "Success get all customers",
      // result: {
      //   data: customers,
      //   // total: totalCustomers,
      //   pageSize: newPageSize,
      //   currentPage: newCurrentPage,
      // },
      data: customers,
    });
  },
  updateCustomerApi: async (req, res) => {
    let imagePath = "";
    let { name, email, phone, address, description, _id } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let result = await uploadSingleFile(req.files.image);
      imagePath = result.data.path;
    }
    let customerData = {
      _id,
      name,
      email,
      phone,
      address,
      image: imagePath,
      description,
    };
    let customer = await updateCustomerService(customerData);
    return res.status(200).json({
      errorCode: 0,
      statusCode: 200,
      message: "Success update customer",
      data: customer,
    });
  },
  softDeleteCustomerApi: async (req, res) => {
    let customerId = req.params.id;
    let customer = await softDeleteCustomerService(customerId);
    return res.status(200).json({
      errorCode: 0,
      statusCode: 200,
      message: "Success delete customer",
      data: customer,
    });
  },
  softDeleteArrayCustomerApi: async (req, res) => {
    let customersId = req.body.customersId;
    let customers = await softDeleteArrayCustomerService(customersId);
    return res.status(200).json({
      errorCode: 0,
      statusCode: 200,
      message: "Success delete customers",
      data: customers,
    });
  },
};
