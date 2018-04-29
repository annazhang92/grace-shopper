const Sequelize = require('sequelize');
const conn = require('./conn');

const Order = conn.define('order', {
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL,
    isNumeric: true
  },
  fullName: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  creditCardNumber: {
    type: Sequelize.STRING,
  }
  /*
  leaving this empty...should auto-generate:
  - id
  - timestamp
  - userId
  - shippingAddress
  - paymentMethod
  - LineItem (multiple)
  */
});

module.exports = Order;
