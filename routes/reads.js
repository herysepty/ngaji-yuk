const {Quran} = require('../models/quran'); 
const {User} = require('../models/user');
const {Reads} = require('../models/reads');
const ModuleQuran = require('../lib/ModuleQuran');  
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const reads = await Reads.find().select('-__v');
    res.send(reads);
});

router.post('/', async (req, res) => {
    const users = await User.find();
    const qurans = await Quran.find();
    const moduleQuran = new ModuleQuran();
    const resultQuran = moduleQuran.getGenerate(users, qurans);

    await Reads.insertMany(resultQuran, (err, docs) => {
        if (err) {
            return res.send(err);
        } else {
            res.send(resultQuran);
        }
    });
});

module.exports = router;