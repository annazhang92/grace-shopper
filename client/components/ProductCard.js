import React from 'react';
import { Link } from 'react-router-dom';
import store, { updateLineItem, deleteLineItem } from '../store';
import { connect } from 'react-redux';


const ProductCard = ({ products, lineItems, updateLineItem, deleteLineItem }) => {

  return (
    <div className="wrapper">
      {
        products ?
        products.map(product => {
          const lineItem = lineItems ? lineItems.find(lineItem => lineItem.productId === product.id) : null;
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
                <br></br>
                {lineItem ?
                  <div>
                    <button onClick={ () => updateLineItem(lineItem.id, { quantity: lineItem.quantity - 1 }) }>-</button>
                    <span className="price">Quantity: {lineItem.quantity}</span>
                    <button onClick={ () => updateLineItem(lineItem.id, { quantity: lineItem.quantity + 1 }) }>+</button>
                    <br></br>
                    <button onClick={ () => deleteLineItem(lineItem.id) }>Delete</button>
                  </div>
                  : null
                }
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

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateLineItem: (id, lineItem) => dispatch(updateLineItem(id, lineItem, history)),
    deleteLineItem: (id) => dispatch(deleteLineItem(id, history)),

  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
