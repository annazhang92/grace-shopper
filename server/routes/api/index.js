const app = require('express').Router();

app.use('/products', require('./products'));
app.use('/categories', require('./categories'));

module.exports = app;
