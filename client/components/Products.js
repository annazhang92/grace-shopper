import React from 'react';
import { connect } from 'react-redux';
// this fixes image render from pinging the website too much at once
import LazyLoad from 'react-lazy-load';
import { PageHeader } from 'react-bootstrap';

import ProductCard from './ProductCard';

const Products = ({ products, categories }) => {
  if (products && categories) {
    return (
      <div>
        <PageHeader>{ categories.name } Products offered: { products.length }</PageHeader>
        <LazyLoad>
          <ProductCard products={ products } />
        </LazyLoad>
      </div>
    );
  }
  return <PageHeader>There are no products currently available</PageHeader>;
};

const mapStateToProps = ({ products, categories }, { id }) => {
  if (id) {
    products = products.filter(product => product.categoryId === id);
    categories = categories.find(category => category.id === id);
  }
  return {
    products,
    categories
  };
};

export default connect(mapStateToProps)(Products);
