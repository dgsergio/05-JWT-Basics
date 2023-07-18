const jwt = require('jsonwebtoken');
const { unAuthorizeError } = require('../errors');
require('dotenv').config();

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer '))
    throw new unAuthorizeError('access denied!');
  const token = req.headers.authorization.split(' ')[1];
  const { username } = jwt.verify(token, process.env.JWT_SECRET);
  req.username = username;
  next();
};

module.exports = auth;
