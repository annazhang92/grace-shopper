const conn = require('./conn');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const Address = require('./Address');
const CreditCard = require('./CreditCard');
const LineItem = require('./LineItem');
const Order = require('./Order');
const Review = require('./Review');
const ProductCategory = require('./ProductCategory');

const randomImage = require('./scraped/images.js');

/*
Needed to fake data
Note - latest faker module (installed from Github, NOT npm)
supports unique values!
*/
const faker = require('faker');
const numCategories = 10;
const numProducts = 20;
const numAddresses = 1;
const numLineItems = 300;

// Model relationships
Product.belongsTo(Category);
Category.hasMany(Product);

/*ProductCategory.belongsTo(Product);
ProductCategory.belongsTo(Category);
Product.hasMany(ProductCategory);*/

// Need to test the following:
LineItem.belongsTo(Product);
LineItem.belongsTo(User);
LineItem.belongsTo(Order);

Order.belongsTo(User);
Order.hasOne(Address, { as: 'shippingAddress' })
Order.hasOne(CreditCard, { as: 'paymentMethod' });
Order.hasMany(LineItem);

// Save user data
User.hasMany(Order);
User.hasMany(CreditCard);

Address.belongsTo(User);
User.hasMany(Address);

// Incorporate Cart
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasOne(Address, { as: 'shippingAddress' })
Cart.hasOne(CreditCard, { as: 'paymentMethod' });

// Review - rating support
Review.belongsTo(User);
Review.belongsTo(Product);


const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  return Promise.all([
    Product.create({
      name: 'Mascara',
      description: 'GrandeLASH - MD Lash Enhancing Serum',
      price: 65.00,
      imageUrl: 'https://picsum.photos/300/175/?random'
    })
      .then(() => {
        User.create({
          firstName: 'dopest',
          lastName: 'squad',
          isAdmin: true,
          email: 'dopestsquad@gmail.com',
          password: 'd0p3stSqu*d'
        })
      })
      .then(() => {
        for (let i = 0; i < numAddresses; i++) {
          Address.create({
            address1: faker.address.streetAddress(),
            address2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: 12345,
            phoneNumber: faker.phone.phoneNumber()
          }).then(address => {
            address.setUser(1);
          });
        }
      })
      .then(() => {
        for (let i = 0; i < numCategories; i++) {
          Category.create({
            name: faker.unique(faker.commerce.department),
            imageUrl: randomImage()
          });
        }
      })

      .then(() => {
        for (let i = 0; i < numProducts; i++) {
          Product.create({
            name: faker.unique(faker.commerce.productName),
            description: faker.lorem.sentence(),
            imageUrl: randomImage(),
            price: faker.commerce.price()
          }).then(product => {
            product.setCategory(Math.floor(Math.random() * numCategories) + 1);
            Review.create({
              userId: 1,
              productId: product.id,
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph(),
              rating: (Math.floor(Math.random() * 5))
            }).then(review => {
              Review.create({
                userId: 1,
                productId: review.productId,
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                rating: (Math.floor(Math.random() * 5))
              });
            });
          /*}).then(product => {
            const randomCategoryOne = Math.floor(Math.random() * numCategories) + 1;
            const randomCategoryTwo = (randomCategoryOne + 1 <= numCategories) ? (randomCategoryOne + 1) : (randomCategoryOne - 1); 
            ProductCategory.create({ productId: product.id, categoryId: randomCategoryOne });
            ProductCategory.create({ productId: product.id, categoryId: randomCategoryTwo });
            Review.create({
              userId: 1,
              productId: product.id,
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph(),
              rating: (Math.floor(Math.random() * 5))
            }).then(review => {
              Review.create({
                userId: 1,
                productId: review.productId,
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                rating: (Math.floor(Math.random() * 5))
              });
            });*/
          });
        }
      })
      //GENERATE LINE ITEM DATA SOLELY FOR TOP 5/BOTTOM 5 SELLERS!
      .then(() => {
        for(let i=0; i<numLineItems; i++) {
          LineItem.create({
            quantity: (Math.floor(Math.random() * 5) + 1),
            name: ''
          }).then((lineItem) => {
            lineItem.productId = (Math.floor(Math.random() * numProducts) + 1);
            return lineItem.save();
          })
        }
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
//    ProductCategory,
    Product,
    Cart,
    Address,
    CreditCard,
    LineItem,
    Order,
    Review
  }
};
