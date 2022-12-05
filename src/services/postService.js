const snakeize = require('snakeize');
const camelize = require('camelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const { BlogPost, PostCategory, User, Category } = require('../models');

const createNewPost = async (title, content, id, categoryIds) => {
  const t = sequelize.transaction();
  try {
    const date = new Date().toJSON();
    const newPost = await BlogPost.create(snakeize({
      title, content, id, published: date, updated: date,
    }));
    categoryIds.map(async (e) => {
      await PostCategory.create(snakeize({ postId: newPost.id, categoryId: e }));
    });
    await t.commit();
    return { type: null, message: camelize(newPost) };
  } catch (error) {
    await t.rollback();
    console.log(error);
    throw error;
  }
};

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

module.exports = {
  createNewPost,
  getPosts,
};