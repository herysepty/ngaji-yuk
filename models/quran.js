const Joi = require('joi');
const mongoose = require('mongoose');

const quranSchema = new mongoose.Schema({
  surat: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    unique: true
  },
  total_ayat: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  juz: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  }
});

const Quran = mongoose.model('Quran', quranSchema);

function validateQuran(quran) {
  const schema = {
    surat: Joi.string().min(1).max(50).required(),
    total_ayat: Joi.string().min(1).max(50).required(),
    juz: Joi.string().min(1).max(10).required()
  };
  return Joi.validate(quran, schema);
}

exports.Quran = Quran; 
exports.validate = validateQuran;