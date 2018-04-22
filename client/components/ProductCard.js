import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';


const ProductCard = ( props ) => {
  console.log(`ProductCard props`, props)
  const { products } = props;
  return(
    <div>
      {
        products.length ?
        products.map( product => {
          return(
            <div key={ product.id }>
              <span>
                {product.name}
              </span>
            </div>
          )
        })
        :
        null
      }
    </div>
  )
};

export default ProductCard;
