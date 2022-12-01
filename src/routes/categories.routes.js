const express = require('express');
const tokenMiddleware = require('../middlewares/tokenValidation');
const categoryNameValidation = require('../middlewares/categoryNameValidation');
const categoryService = require('../controllers/categories');

const router = express.Router();

router.post('/', tokenMiddleware, categoryNameValidation, categoryService.createCategory);

module.exports = router;