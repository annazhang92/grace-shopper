const Sequelize = require('sequelize');
const conn = require('./conn');

const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/300/175/?random'
  }
});

module.exports = Category;
