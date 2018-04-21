const app = require('express').Router();

app.use('/products', require('./products'));

module.exports = app;
