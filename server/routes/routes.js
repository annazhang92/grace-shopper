const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../../public/', 'index.html')));
app.use('/dist',express.static(path.join(__dirname,'../dist')));

app.use(require('body-parser').json());

app.use('/api', require('./api'));

//TODO - catch al err route
// app.use((err, req, res, next)=> {
//   res.status(500).send(err);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => ` listening on port ${port}`);

module.exports = app;
