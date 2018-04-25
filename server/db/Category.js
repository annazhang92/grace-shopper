const Sequelize = require('sequelize');
const conn = require('./conn');

const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    // TODO: add default
    type: Sequelize.STRING
  }
});

module.exports = Category;
