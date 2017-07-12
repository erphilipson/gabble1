'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    message: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});

  post.associate = function(models) {
    post.belongsTo(models.user, {as: 'user', foreignKey:'userId'}) 
  }
  return post;
};
