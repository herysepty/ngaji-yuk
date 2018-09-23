const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Quran, validate} = require('../models/quran');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const quran = await Quran.find().select({'_id': 1, 'surat': 1, 'total_ayat': 1, 'juz': 1}).sort('surat');

    if (Object.keys(quran).length === 0 || !quran) return res.status(400).send({
      'status': 'ok',
      'error':[
        'Data is not found'
      ]
    });

    res.send(quran)
});

router.get('/:id', async (req, res) => {
    const quran = await Quran.findById(req.params.id);

    if (!quran) return res.status(400).send({
      'status': 'error',
      'errors': [
        'surat or juz is not found'
      ]
    })

    res.send(quran)
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let checkQuran = await Quran.findOne({'surat': req.body.surat});
    if (checkQuran) return res.status(400).send({
      'status': 'error',
      'errors': [
        'surat is available'
      ]
    });

    let quran = new Quran({ 
      surat: req.body.surat,
      total_ayat: req.body.total_ayat,
      juz: req.body.juz 
    });

    quran = await quran.save();
    
    res.send(quran);
});

router.put('/:id', async (req, res) => {    
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        'status': 'error',
        'errors': [
          'id not valid'
        ]
      });
    }

    let checkQuran = await Quran.findById(req.params.id);
    if (!checkQuran) return res.status(400).send({
      'status': 'error',
      'errors': [
        'surat is not available'
      ]
    });

    const quran = await Quran.findByIdAndUpdate(req.params.id, { 
      surat: req.body.surat,
      total_ayat: req.body.total_ayat,
      juz: req.body.juz
    }, {
        new: true
    });
    
    if (!quran) return res.status(400).send({
      'status': 'error',
      'errors':[
        'Quran not available'
      ]
    })

    res.send(_.pick(quran,['_id', 'surat', 'total_ayat', 'juz']));
});

router.delete('/:id', async (req, res) => {
    const quran = await Quran.findByIdAndRemove(req.params.id);

    if (!quran) return res.status(400).send({
      'status': 'ok',
      'data':_.pick(user, ['_id', 'surat', 'total_surat', 'juz'])
    });

    res.send(quran);
});

module.exports = router;