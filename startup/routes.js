const express = require('express');
// const auth = require('../routes/auth');
const company = require('../routes/Company');
const employee = require('../routes/Employee');
const error = require('../middleware/error');
module.exports = function(app) {
  app.use(express.json());
  // app.use('/api/auth', auth);
  app.use('/api/company', company);
  app.use('/api/employee', employee);  
  app.use(error);
}