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
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/300/175/?random'
  },
  price: {
    type: Sequelize.DECIMAL,
    isNumeric: true
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 5
  }
});

module.exports = Product;
