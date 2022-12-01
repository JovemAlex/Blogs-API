const express = require('express');
const userController = require('../controllers/login');

const router = express.Router();

router.post('/', userController.login);

module.exports = router;