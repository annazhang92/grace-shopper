const app = require('express').Router();
const db = require('../../db');
const { Category } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.send(category))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => {
      Object.assign(category, req.body)
      return product.save();
    })
    .then(category => res.send(category))
    .catch(next);
});