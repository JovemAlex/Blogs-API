const snakeize = require('snakeize');
const camelize = require('camelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
  createNewPost,
};