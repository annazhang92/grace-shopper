import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

const Products = ({ products }) => {
  return (
    <div>
      {
        products.length ?
          <ProductCard products={ products } />
        :
          <h2> There are no products currently available </h2>
      }
    </div>
  );
};

const mapStateToProps = ({ products },{id}) => {
  if(id){products=products.filter( product=> product.categoryId === id);}
  return {
    products
  };
};

export default connect(mapStateToProps)(Products);
