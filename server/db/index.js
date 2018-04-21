const conn = require('./conn');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const Address = require('./Address');
const CreditCard = require('./CreditCard');

const sync = () => {
  return conn.sync({ force: true })
};

const seed = () => {
  return Promise.all([
    Product.create({
      name: 'Mascara',
      description: 'GrandeLASH - MD Lash Enhancing Serum',
      price: 65
    })
  ])
};

module.exports = {
  sync,
  conn,
  seed,
  models: {
    User,
    Category,
    Product,
    Cart,
    Address,
    CreditCard
  }
};
