const companyController = require('../controllers/company');
// const Company = require('../models').Company;
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//     Company.findAll()
//     .then(company => res.status(200).send(company))
//     .catch(error => res.status(400).send(error));
// });

// router.get('/:id', async (req, res) => {
//     Company.findOne({
//         where: {id: req.params.id}
//     })
//     .then(company => res.status(200).send(company))
//     .catch(error => res.status(400).send(error));
// });

// router.post('/', async (req, res) => {
//     Company.create({
//         name:req.body.name,
//     })
//     .then(company => res.status(201).send(company))
//     .catch(error => res.status(400).send(error));
// });

router.post('/', companyController.validate('createUser'), companyController.createUser);

// router.put('/:id', async (req, res) => {
//     Company.update(
//         { name: req.body.name },
//         { where: { id: req.params.id }}
//     ).spread((affectedCount, affectedRows) => {
//         // .update returns two values in an array, therefore we use .spread
//         // Notice that affectedRows will only be defined in dialects which support returning: true
//         // affectedCount will be 2
//         return Company.findAll();
//       })
//     .then(company => res.status(201).send(company))
//     .catch(error => res.status(400).send(error));
// });

// router.delete('/:id', async (req, res) => {
//     Company.destroy({
//     where: {
//         id: req.params.id
//     }
//     // truncate: true /* this will ignore where and truncate the table instead */
//     }).then(company => res.status(201).send(company))
//     .catch(error => res.status(400).send(error));
// });

module.exports = router; 