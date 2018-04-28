const app = require('express').Router();
const db = require('../../db');
const { Order, LineItem } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Order.findAll({
    include: [
      { model: LineItem, as: 'lineItems' }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .catch(next);
});
