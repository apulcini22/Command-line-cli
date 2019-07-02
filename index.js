const mongoose = require('mongoose');

// map global promise - get rid of mongoose promise warning
mongoose.Promise = global.Promise;

// db credentials
const creds = require('./credentials');

const db = mongoose.connect(`mongodb://${creds.db_username}:${creds.db_password}@ds245677.mlab.com:45677/${creds.db_name}`, { 
  useNewUrlParser: true 
});

// Import model
const Customer = require('./models/customer');

// Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then( customer => {
    console.info("New customer has been added");
    mongoose.connection.close();
  })
  .catch(err => console.info('error', err))
}

// Find Customer
const findCustomer = (name) => {
  // regex to make search not case sensative
  const search = new RegExp(name, 'i');
  // $or means "or" in mongoose for finding an instance
  Customer.find({$or: [
    {firstname: search}, 
    {lastname: search}
  ]})
  .then( customer => {
    if(customer.length <= 0) {
      console.info('No customer with that name. Please try again');
    } else {
      console.info(customer);
      console.info(`${customer.length} matches`);
    }
    mongoose.connection.close();
  })
  .catch(err => console.info('error', err));
}

// Update a customer
const updateCustomer = (_id, customer) => {
  Customer.updateOne({ _id }, customer)
    .then( customer => {
    console.info('Customer updated');
    mongoose.connection.close();
  })
  .catch(err => console.info('error', err))
}

// Remove a customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id })
    .then( customer => {
      console.info('Customer removed');
      mongoose.connection.close();
    })
    .catch(err => console.info('error', err))
}

// List Customers
const listCustomers = (_) => {
  Customer.find()
    .then( customers => {
      console.info(customers);
      console.info(`${customers.length} Customers Found`);
      mongoose.connection.close();
    })
    .catch(err => console.info('error', err))
}

// Export methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  listCustomers,
  removeCustomer
};

