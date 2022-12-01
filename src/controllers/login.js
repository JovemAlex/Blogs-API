require('dotenv/config');

const UserService = require('../services/userService');
const errorMap = require('../utils/errorMap');
const generateToken = require('../auth/jwtFunctions');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { type, message } = await UserService.checkUser(email, password);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    const token = generateToken.createToken(email);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  login,
};