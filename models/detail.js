const mongoose = require('mongoose');
const Joi = require('joi');

const detailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    immutable: true,
    minlength: 4,
    maxlength: 25,
  },
  gmail: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  contact: {
    type: Number,
    min: 9800000000,
    max: 9899999999,
    required: true,
  },
  dob: {
    type: String,
    required: true,
    immutable: true,
  },
  language: {
    type: Array,
    required: function (v) {
      return v && v.lenth > 0;
    },
  },
});

const Detail = mongoose.model('Detail', detailSchema);

function validateDetail(detail) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(25).required(),
    gmail: Joi.string().email().min(10).max(50).required(),
    address: Joi.string().min(10).max(100).required(),
    contact: Joi.number().min(9800000000).max(9899999999).required(),
    dob: Joi.string().required(),
    language: Joi.string().required(),
  });
  return schema.validate(detail);
}

module.exports.Detail = Detail;
module.exports.validateDetail = validateDetail;
