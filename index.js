const mongoose = require('mongoose');
const express = require('express');
const detail = require('./routes/details');
const me = require('./routes/registerMe');
const app = express();
require('dotenv').config();

mongoose.connect('mongodb://localhost/portfolio').then(() => {
  console.log('db connected success');
});

app.use(express.json());
app.use('/api/details', detail);
app.use('/api/me', me);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
