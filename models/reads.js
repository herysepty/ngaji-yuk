const Joi = require('joi');
const mongoose = require('mongoose');

const Reads = mongoose.model('Reads', new mongoose.Schema({
   date: {
       type: String,
       require: true
   },
   user: {
       type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 50
            }
       }),
       require: true
   },
   ayat: [{
       type: new mongoose.Schema({
            data: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 50
            }
       }),
       require: true
   }]
}));

function validateReads(read) {
    const schema = {

    }
}

exports.Reads = Reads;
exports.validate = validateReads;
