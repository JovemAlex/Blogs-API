const snakeize = require('snakeize');
const { User } = require('../models');
const validate = require('../validations/validateInput');

const getEmail = (email) => User.findOne({ where: { email } });

const checkUser = async (email, password) => {
  const error = await validate.validateLogin(email, password);
  if (error.type) return error;

  const user = await getEmail(email);

  if (!user || user.password !== password) {
    return { type: 'UNMATCHED_FIELDS', message: 'Invalid fields' };
  }

  return { type: null, message: user };
};

const createUser = async (displayName, email, password, image) => {
  const error = await validate.validateUserCreation(displayName, email, password);
  if (error.type) return error;

  const userExist = await getEmail(email);
  console.log(userExist);
  if (userExist) return { type: 'CONFLICT', message: 'User already registered' };

  const newUserCreated = await User.create(snakeize({ displayName, email, password, image }));
  return { type: null, message: newUserCreated };
};

module.exports = {
  getEmail,
  checkUser,
  createUser,
};
