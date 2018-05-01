const app = require('express').Router();
const db = require ('../../db');
const { Address } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Address.findAll()
    .then(addresses => res.send(addresses))
    .catch(next);
})

app.post('/', (req, res, next) => {
  Address.create(req.body)
    .then(address => res.send(address))
    .catch(next);
})

app.put('/:id', (req, res, next) => {
  Address.findById(req.params.id)
    .then(address => {
      Object.assign(address, req.body);
      return address.save();
    })
    .then(address => res.send(address))
    .catch(next);
})