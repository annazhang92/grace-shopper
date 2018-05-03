const Sequelize = require('sequelize');
const conn = require('./conn');

const Review = conn.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
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
