const Sequelize = require('sequelize');
const conn = require('./conn');

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  }
});

module.exports = LineItem;
