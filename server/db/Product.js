const conn = require('./conn');
const { Sequelize } = conn;

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING
    //TODO: add default
  },
  price: {
    type: Sequelize.DECIMAL,
    isNumeric: true,
  }
});

module.exports = Product;
