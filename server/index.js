const express = require('express');
const app = express();
const port =process.env.PORT || 3000;
const Sequelize = require('sequelize');
const path = require('path');
const db = require('./db');

app.listen(port,()=>console.log(`listening on port ${port}`) );

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public'))); 

// 'API' routes
app.use('/api', require('./api'));


db.sync().then(() => console.log('Database is synced'));


