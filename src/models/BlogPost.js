module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: 'blog_posts',
  });

  BlogPost.associate = (models) => {

    BlogPost.belongsTo(models.User,
      { foreignKey: 'user_id', as: 'user' });
    
    BlogPost.hasMany(models.PostCategory,
      { foreignKey: 'post_id', as: 'blog_posts' });
  };

  return BlogPost;
}