const app = require('express').Router();
const db = require('../../db');
const { LineItem } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  LineItem.findAll()
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

app.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.send(lineItem))
    .catch(next);
});


app.put('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => {
      Object.assign(lineItem, req.body)
      return lineItem.save();
    })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});


app.delete('/:id', (req, res, next)=> {
  LineItem.findById(req.params.id)
    .then(lineItem => {
      return lineItem.destroy();
    })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});
