import React from 'react';
import { Link } from 'react-router-dom';


const ProductCard = props => {
  const { products } = props;
  return (
    <div className="wrapper">
      {
        products ?
        products.map(product => {
          return (
            <div key={ product.id }>
              <div className="card card-1">
                <span className="card-header">
                  <img alt="product here" src={ product.imageUrl } />
                </span>
                <Link to={ `/products/${product.id}` }>
                  <h3>{product.name}</h3>
                </Link>
                <span className="price">
                  Price: ${product.price}
                </span>
              </div>
            </div>
          );
        })
        :
        null
      }
    </div>
  );
};

export default ProductCard;
