const Sequelize = require('sequelize');
const conn = require('./conn');

const ProductCategory = conn.define('product_category', {})

module.exports = ProductCategory;