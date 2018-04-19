const conn = require('./conn');
const User = require('./User');

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