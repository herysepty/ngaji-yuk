const express = require('express');
const reads = require('../routes/reads');
const users = require('../routes/users');
const quran = require('../routes/quran');
const auth = require('../routes/auth');
const error = require('../middleware/error');
module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/quran', quran);
  app.use('/api/reads', reads);
  app.use('/api/auth', auth);
  app.use(error);
}