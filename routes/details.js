const express = require('express');
const router = express.Router();
const { Detail, validateDetail } = require('../models/detail');
const _ = require('lodash');

router.get('/', async (req, res) => {
  const detail = await Detail.find();
  res.send(detail);
});

router.post('/', async (req, res) => {
  const { error } = validateDetail(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const detail = new Detail(
    _.pick(res.body, ['name', 'gmail', 'address', 'contact', 'dob', 'language'])
  );
  await detail.save();
  res.send(
    _.pick(detail, ['name', 'gmail', 'address', 'contact', 'dob', 'language'])
  );
});

router.put('/:id', async (req, res) => {
  const { error } = validateDetail(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const detail = await Detail.findByIdAndUpdate(
    req.params.id,
    _.pick(res.body, ['gmail', 'address', 'contact', 'language'])
  );
  if (!detail) return res.status(400).send('Detail not found');

  await detail.save();
  res.send(detail);
});

module.exports = router;
