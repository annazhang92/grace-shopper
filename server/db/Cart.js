const Sequelize = require('sequelize');
const conn = require('./conn');

const Cart = conn.define('cart', {
  /*
  This should be the same as order.
  Cart => new Order when user checks out.
  Then empty the cart.
  */
});

module.exports = Cart;
