const app = require('express').Router();
const db = require('../../db');
const { Product } = db.models;
module.exports = app;

app.get('/',(req, res, next) => {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});
