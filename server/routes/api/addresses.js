const app = require('express').Router();
const db = require ('../../db');
const { Address } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Address.findAll()
    .then(addresses => res.send(addresses))
    .catch(next);
})