const express = require('express');

const postController = require('../controllers/post');
const tokenMiddleware = require('../middlewares/tokenValidation');
const postInputsValidate = require('../middlewares/postInputsValidate');

const router = express.Router();

router.post('/', tokenMiddleware, postInputsValidate, postController.createNewPost);

module.exports = router;