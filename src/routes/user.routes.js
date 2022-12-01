const express = require('express');

const userController = require('../controllers/user');
const tokenMiddleware = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', tokenMiddleware, userController.getAllUsers);
router.get('/:id', tokenMiddleware, userController.getUserById);

module.exports = router;