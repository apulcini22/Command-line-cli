#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const { 
  addCustomer,
  findCustomer,
  updateCustomer,
  listCustomers,
  removeCustomer } = require('./index');


// Questions asked when adding customer
const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Customer First Name:'
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Customer Last Name:'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer Phone Number:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer Email:'
  }
];

program
  .version('1.0.0')
  .description('Client Management System');

// add a customer command without using inquirer
program 
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action( () => {
    prompt(questions)
    .then(answers => addCustomer(answers))
    .catch(err => console.info('error:', err))
  })

// Find a customer command
program 
  .command('find <name>')
  .alias('f')
  .description('Find a customer')
  .action( (name) => findCustomer(name) );

// Update a customer command
program 
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .action( (_id) => {
    prompt(questions)
    .then(answers => updateCustomer(_id, answers) )
    .catch(err => console.info('error:', err))
  })

// List a customer command
program 
  .command('list')
  .alias('l')
  .description('List all customers')
  .action( () => listCustomers() )

// Remove a customer command
program 
  .command('remove <_id>')
  .alias('r')
  .description('Remove a customer')
  .action( (_id) => removeCustomer(_id) )



  program.parse(process.argv);
