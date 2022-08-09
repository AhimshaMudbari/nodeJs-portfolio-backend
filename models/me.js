const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWTSECRET;
const complex = {
  min: 5,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 4,
};

const meSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 10,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

meSchema.methods.authMeToken = function () {
  const token = jwt.sign(this._id, jwtSecret);
  return token;
};
const Me = mongoose.model('Me', meSchema);

function validateMe(haha) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().min(10).max(50).required(),
    password: passwordComplexity(complex),
  });
  return schema.validate(haha);
}

module.exports.Me = Me;
module.exports.validateMe = validateMe;
