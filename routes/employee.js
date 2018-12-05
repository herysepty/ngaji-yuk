const Employee = require('../models').Employee;
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    Employee.findAll()
    .then(employee => res.status(200).send(employee))
    .catch(error => res.status(400).send(error));
});

router.post('/', async (req, res) => {
    Employee.create({
        name:req.body.name,
        designation:req.body.designation,
        salary:req.body.salary,
        companyId: req.body.companyId
    })
    .then(employee => res.status(201).send(employee))
    .catch(error => res.status(400).send(error));
});

router.put('/:id', async (req, res) => {
    Employee.update(
        { name: req.body.name },
        { where: { id: req.params.id }}
    ).spread((affectedCount, affectedRows) => {
        // .update returns two values in an array, therefore we use .spread
        // Notice that affectedRows will only be defined in dialects which support returning: true
        // affectedCount will be 2
        return employee.findAll();
      })
    .then(employee => res.status(201).send(employee))
    .catch(error => res.status(400).send(error));
});

router.delete('/:id', async (req, res) => {
    Employee.destroy({
    where: {
        id: req.params.id
    }
    // truncate: true /* this will ignore where and truncate the table instead */
    }).then(employee => res.status(201).send(employee))
    .catch(error => res.status(400).send(error));
});

module.exports = router; 