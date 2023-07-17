const jwt = require('jsonwebtoken');
const { badRequestError, unAuthorizeError } = require('../errors');
require('dotenv').config();

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new badRequestError('Please provide name and password');

  const id = new Date().getDate();
  console.log(id);
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: `user created!`, token });
};

const dashboard = (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer '))
    throw new unAuthorizeError('access denied!');

  const token = req.headers.authorization.split(' ')[1];
  const { username } = jwt.verify(token, process.env.JWT_SECRET);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
