const Sequelize = require('sequelize');
const conn = require('./conn');

const Order = conn.define('order', {
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
