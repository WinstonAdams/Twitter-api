'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/jUZg5Mm.png'
      },
      banner: {
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/xwLLnZh.png'
      },
      introduction: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
}
