const conn = require('./conn');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const Address = require('./Address');
const CreditCard = require('./CreditCard');

const sync = () => conn.sync({ force: true });

module.exports = {
  sync,
  conn,
  models: {
    User,
    Category,
    Product,
    Cart,
    Address,
    CreditCard
  }
};
