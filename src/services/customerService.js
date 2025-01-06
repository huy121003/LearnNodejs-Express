const {
  pageSizeConfig,
  currentPageConfig,
} = require("../configs/paginationConfig");
const regexQueryConfig = require("../configs/regexQueryConfig");
const Customer = require("../models/customer");
const aps = require("api-query-params");
const createCustomerService = async (customerData) => {
  try {
    let customer = await Customer.create({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      image: customerData.image,
      description: customerData.description,
    });
    return customer;
  } catch (err) {
    return null;
  }
};
const createArrayCustomerService = async (customersData) => {
  try {
    let result = await Customer.insertMany(customersData);
    return result;
  } catch (err) {
    return null;
  }
};
const getAllCustomerService = async (queryString) => {
  try {
    // Giải nén và chuẩn bị các tham số từ queryString
    const { filter, skip, limit, sort, projection, population } =
      aps(queryString);
    let { pageSize, currentPage, ...newFilter } = filter;
    console.log("newFilter", regexQueryConfig(newFilter));
    // Cấu hình phân trang
    console.log("newFilter", newFilter);
    // Thực hiện truy vấn tới cơ sở dữ liệu
    const customers = await Customer.find(newFilter)
      .limit(pageSizeConfig(pageSize))
      .skip((currentPageConfig(currentPage) - 1) * pageSizeConfig(pageSize))
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();

    // Trả về danh sách khách hàng
    return customers;
  } catch (err) {
    console.error("Error in getAllCustomerService:", err); // Log lỗi để debug
    return {
      success: false,
      message: "Failed to fetch customers",
      error: err.message,
    };
  }
};

const updateCustomerService = async (customerData) => {
  try {
    let customer = await Customer.updateOne(
      { _id: customerData._id },
      {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        image: customerData.image,
        description: customerData.description,
      }
    );
    return customer;
  } catch (err) {
    return null;
  }
};
const softDeleteCustomerService = async (id) => {
  try {
    let customer = await Customer.deleteById(id);
    return customer;
  } catch (err) {
    return null;
  }
};
const softDeleteArrayCustomerService = async (ids) => {
  try {
    let customer = await Customer.delete({ _id: { $in: ids } });
    return customer;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  updateCustomerService,
  softDeleteCustomerService,
  softDeleteArrayCustomerService,
};
