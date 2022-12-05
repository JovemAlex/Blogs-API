const postService = require('../services/postService');
const errorMap = require('../utils/errorMap');

const getAllPosts = async (_req, res) => {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getPostById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  getAllPosts,
  getPostById,
};

// 🚩🚩🚩🚩🚩 Achar o log