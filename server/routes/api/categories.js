const app = require('express').Router();
const db = require('../../db');
const { Category } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
});
