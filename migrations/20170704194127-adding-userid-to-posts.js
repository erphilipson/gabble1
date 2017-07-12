'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'posts',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    )

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'posts',
      'userId'
    )
  }
};
