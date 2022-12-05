const express = require('express');

const postController = require('../controllers/post');
const tokenMiddleware = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/', tokenMiddleware, postController.getAllPosts);
router.get('/:id', tokenMiddleware, postController.getPostById);

module.exports = router;