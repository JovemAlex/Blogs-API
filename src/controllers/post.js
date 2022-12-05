const postService = require('../services/postService');
const userService = require('../services/userService');
const errorMap = require('../utils/errorMap');
const categoryService = require('../services/categoryService');

const createNewPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const categories = await categoryService.getCategories();
    const ids = categories.map(({ dataValues: { id } }) => id);
    const categoryExist = categoryIds.every((id) => ids.includes(id));
    console.log('🚩🚩🚩🚩🚩', categoryExist);
    if (!categoryExist) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
    const { id } = await userService.getEmail(req.user.data);
    const { type, message } = await postService.createNewPost(title, content, id, categoryIds);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Internal error' });
  }
};

const getAllPosts = async (req, res) => {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
};

module.exports = {
  createNewPost,
  getAllPosts,
};

// 🚩🚩🚩🚩🚩