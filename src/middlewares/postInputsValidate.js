const Joi = require('joi');

const postInputsValidate = (body) => 
  Joi.object({
    title: Joi.string().required().label('title'),
    content: Joi.string().required().label('content'),
    categoryIds: Joi.array().required().label('categoryIds'),
  }).validate(body);

module.exports = (req, res, next) => {
  const { error } = postInputsValidate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};