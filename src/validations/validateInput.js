const schemas = require('./schema');

const validateLogin = async (email, password) => {
  const { error } = schemas.loginSchema.validate({ email, password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateUserCreation = async (displayName, email, password) => {
  const { error } = schemas.userSchema.validate({ displayName, email, password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
  validateUserCreation,
};