import React from 'react';
import { connect } from 'react-redux';
// this fixes image render from pinging the website too much at once
import LazyLoad from 'react-lazy-load';
import ProductCard from './ProductCard';

const Products = ({ products }) => {
  return (
    <div>
      {
        products.length ?
          <LazyLoad>
            <ProductCard products={ products } />
          </LazyLoad>
        :
          <h2> There are no products currently available </h2>
      }
    </div>
  );
};

const mapStateToProps = ({ products }, { id }) => {
  if (id) {
    products = products.filter(product => product.categoryId === id);
  }
  return {
    products
  };
};

export default connect(mapStateToProps)(Products);
