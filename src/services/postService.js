const { BlogPost, User, Category } = require('../models');

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return posts;
};

const getPostById = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  if (!postById) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: postById };
};

module.exports = {
  getPosts,
  getPostById,
};