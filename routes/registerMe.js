const express = require('express');
const router = express.Router();
const { Me, validateMe } = require('../models/me');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { error } = validateMe(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const me = await Me.findOne({ email: req.body.email });
  if (me) return res.status(400).send('wt? I am already registered');

  me = new Me(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(11);
  me.password = await bcrypt.hash(me.password, salt);

  const token = Me.authMeToken();

  await me.save();
  res.header('x-me-token', token).send(_.pick(me, ['name', 'email']));
});

module.exports = router;
