const express = require('express');
const app = express();
const path = require('path');
const db = require('../db');

app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname,'../../dist')));
app.use('/public', express.static(path.join(__dirname,'../../public')));

app.use('/api', require('./api'));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../../public/', 'index.html')));
//TODO - catch al err route
// app.use((err, req, res, next)=> {
//   res.status(500).send(err);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => ` listening on port ${port}`);

db.sync()
  .then(() => db.seed());

module.exports = app;
