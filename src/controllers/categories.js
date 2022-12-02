const categoryService = require('../services/categoryService');
const errorMap = require('../utils/errorMap');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { type, message } = await categoryService.createCategory(name);
    if (type) return res.status(errorMap.errorMap(type)).json(message);
  
    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};