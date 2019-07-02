const mongoose = require('mongoose');

// Create customer Schema
const customerSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  phone: { type: String },
  email: { type: String }
});

// define and export Schema
module.exports = mongoose.model('Customers', customerSchema);