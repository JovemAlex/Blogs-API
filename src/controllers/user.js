require('dotenv/config');

const UserService = require('../services/userService');
const errorMap = require('../utils/errorMap');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
  
    const { type, message } = await UserService.createUser(displayName, email, password, image);
  
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    const token = createToken(email);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { type, message } = await UserService.getUsers();
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await UserService.getByPk(id);
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};