const app = require('express').Router();
const db = require('../../db');
const { Review } = db.models;
module.exports = app;

app.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.send(review))
    .catch(next);
});
