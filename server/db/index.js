const conn = require('./conn');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const Address = require('./Address');
const CreditCard = require('./CreditCard');
const LineItem = require('./LineItem');
const Order = require('./Order');

// Needed to fake data
const faker = require('faker');
const numCategories = 3;
const numProducts = 10;

// Model relationships
Product.belongsTo(Category);
Category.hasMany(Product);

// Need to test the following:
LineItem.hasOne(Product);
LineItem.belongsTo(Order);

Order.belongsTo(User);
Order.hasOne(Address, { as: 'shippingAddress' })
Order.hasOne(CreditCard, { as: 'paymentMethod' });
Order.hasMany(LineItem);

// Save user data
User.hasMany(Order);
User.hasMany(Address);
User.hasMany(CreditCard);

// Incorporate Cart
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasOne(Address, { as: 'shippingAddress' })
Cart.hasOne(CreditCard, { as: 'paymentMethod' });
Cart.hasMany(LineItem);

const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  return Promise.all([
    Product.create({
      name: 'Mascara',
      description: 'GrandeLASH - MD Lash Enhancing Serum',
      price: 65.00,
      imageUrl: 'https://picsum.photos/200/300/?random'
    })
      .then(() => {
        for (let i = 0; i < numCategories; i++) {
          Category.create({
            name: faker.commerce.department()
          });
        }
      })
      .then(()=>{
        for (let i = 0; i < numProducts; i++) {
          Product.create({
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            imageUrl: 'https://picsum.photos/200/300/?random',
            price: faker.commerce.price()
          }).then(product => {
            product.setCategory(Math.floor(Math.random() * numCategories) + 1);
          });
        };
      })
  ]);
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
