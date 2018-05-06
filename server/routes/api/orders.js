const app = require('express').Router();
const db = require('../../db');
const { Order, LineItem } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Order.findAll({
    include: [ LineItem ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .catch(next);
});


app.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => {
      Object.assign(order, req.body)
      return order.save();
    })
    .then(order => res.send(order))
    .catch(next);
});


app.put('/status/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => {
      Object.assign(order, req.body)
      return order.save();
    })
    .then(order => res.send(order))
    .catch(next);
});