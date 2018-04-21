const app = require('express').Router();
const db = require('../../db');
const { Product } = db.models;

app.get('/',(req, res, next) => {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});
