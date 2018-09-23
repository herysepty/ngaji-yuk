const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['m','f']
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    sex: Joi.string().valid('m', 'f').required()
  };
  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;