const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // const user = await User.findById(req.user._id).select('-password');
  const users = await User.find().select({'_id': 1, 'name': 1, 'sex': 1}).sort('name');
  res.send(users);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send({
    'status': 'error',
    'error': [
        error.details[0].message
    ]
  });

  let checkUser = await User.findOne({name: req.body.name});

  if (checkUser) return res.status(400).send({
    'status': 'error',
    'error': [
        'User already use'
    ]
  });

  let user = new User({ 
    name: req.body.name,
    sex: req.body.sex
  });
  user = await user.save();
  user = _.pick(user, ['_id', 'name', 'sex']);
  res.send(user);
});

router.put('/:id', async(req, res) => {
  const {error} = validate(req.body);
  
  if (error) return res.status(400).send({
    'status': 'error',
    'error': [
      error.details[0].message
    ]
  });

  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    sex: req.body.sex
  }, {
    new: true
  })

  if(!user) return res.status(400).send('User is not found');
  res.send(_.pick(user, ['_id', 'name', 'sex']));
})

router.delete('/:id', async(req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(400).send('Users is not found');
  
  res.send({
    'status': 'ok',
    'data':_.pick(user, ['_id', 'name', 'sex'])
  });
});

module.exports = router; 
