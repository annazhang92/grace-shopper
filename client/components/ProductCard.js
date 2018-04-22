import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const ProductCard = ( props ) => {
  console.log(`ProductCard props`, props)
  const { products } = props;
  return(
    <div style={{display:'flex', flexDirection:'row'}}>
      {
        products.length ?
        products.map( product => {
          return(
            <div key={ product.id }>
              <div className='card card-1'>
                  <span className='card-header'>
                    <img src={product.imageUrl} />
                  </span>
                  <Link to={`/products/${product.id}`}>
                   <h3>{product.name}</h3>
                  </Link>
                <span className='price'>
                  Price: ${product.price}
                </span>
              </div>
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
