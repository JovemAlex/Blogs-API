const express = require('express');
const tokenMiddleware = require('../middlewares/tokenValidation');
const categoryNameValidation = require('../middlewares/categoryNameValidation');
const categoryController = require('../controllers/categories');

const router = express.Router();

router.post('/', tokenMiddleware, categoryNameValidation, categoryController.createCategory);
router.get('/', tokenMiddleware, categoryController.getAllCategories);

module.exports = router;