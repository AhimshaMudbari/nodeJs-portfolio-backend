const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWTSECRET;
module.exports = function (req, res, next) {
  const token = req.header('x-me-token');
  if (!token) res.status(401).send('Access denied , no tokere here...');

  try {
    const validPayload = jwt.verify(token, jwtSecret);
    res.me = validPayload;
    next();
  } catch (e) {
    res.status(400).send('Inavlid token hehehaha...');
  }
};
