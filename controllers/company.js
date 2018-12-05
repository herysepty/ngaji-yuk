const Company = require('../models').Company;
const Joi = require('joi');

exports.createUser = (req, res, next) => {
    const { name, address, phone_number, email, time_zone, tin, city_id } = req.body;
    // isValidEmail is some custom email function to validate email which you might need write on your own or use npm module
    Company.create({
        name
    })
    .then(company => res.status(201).send(company))
    .catch(error => res.status(400).send(error));
}

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return (req, res, next) => {
                const schema = {
                    email: Joi.string()
                };
        
                const result = Joi.validate(req.body, schema);
                
                if (!req.value) return res.status(400).json(result.error.details[0].message);
                if (!req.value) req.value = {};
                req.value['body'] = result.value.details[0].message;
                next();
            }
        }
    }
}