const app = require('express').Router();
const db = require('../../db');
const { Product, ProductCategory, Category } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: ProductCategory,
      include: [
        Category
      ]
    }]
   // include: [{
    //  model: ProductCategory,
 //     include: [ Category ]
    //}]
  })
  //Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next)
});

app.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      Object.assign(product, req.body)
      return product.save();
    })
    .then(product => res.send(product))
    .catch(next);
});