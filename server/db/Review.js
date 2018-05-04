const Sequelize = require('sequelize');
const conn = require('./conn');

const Review = conn.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Review;
