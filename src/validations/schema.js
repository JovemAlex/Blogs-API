const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
});

const userSchema = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required()
    .label('displayName'),
  email: Joi.string()
    .email()
    .required()
    .label('email'),
  password: Joi.string()
    .min(6)
    .required()
    .label('password'),
});

module.exports = {
  loginSchema,
  userSchema,
};