const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const { Schema, model } = mongoose;
// Define the schema
const customerSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    address: { type: String, required: [true, "Address is required"] },
    phone: { type: String, required: [true, "Phone is required"] },
    email: { type: String, required: [true, "Email is required"] },
    image: { type: String },
    description: { type: String, required: [true, "Description is required"] },
  },
  {
    timestamps: true,
    static: {
      findByName(name) {
        return this.find({ name: new RegExp(name, "i") });
      },
    },
  }
);

// Define the model
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// Define the model
const Customer = model("customer", customerSchema);

module.exports = Customer;
