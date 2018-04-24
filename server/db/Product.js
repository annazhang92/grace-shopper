const Sequelize = require('sequelize');
const conn = require('./conn');

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    // TODO: add default
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL,
    isNumeric: true
  }
});

module.exports = Product;
