const app = require('express').Router();

app.use('/products', require('./products'));
app.use('/categories', require('./categories'));
app.use('/sessions', require('./sessions'));
app.use('/orders', require('./orders'));
app.use('/users', require('./users'));
app.use('/lineItems', require('./lineItems'));
app.use('/addresses', require('./addresses'));
app.use('/reviews', require('./reviews'));

module.exports = app;
