/* eslint-disable */
import React, { Component } from 'react';
import store, { createLineItem } from '../store';
import { connect } from 'react-redux';

import StarRatingComponent from 'react-star-rating-component';
import Reviews from './Reviews';
import ProductReview from './ProductReview';


const ProductDetail = ({ product, createLineItem, user, loggedIn }) => {
  return (
    <div className="container">
      {product &&
      <div>
        <h2>{product.name}</h2>
        <div>
          <button className="btn btn-warning" onClick={ () => loggedIn? createLineItem({ productId: product.id, userId: user.id, quantity: 1, price: product.price, name: product.name }) : console.log ('please login') }>Add to Cart</button>
          {/* onClick={()=>createLineItem(this.props.product.id,1)} */}
        </div>
        <img src={product.imageUrl}></img>
        <p><strong>Price</strong> {product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <ProductReview product={ product } user={ user }/>
        <hr/>
        <Reviews product={ product } />
      </div>
      }
    </div>
  );
}

const mapStateToProps = ({ products, user }, { id }) => {
  const product = products.find( product => product.id === id);
  const loggedIn = !!user.id;
  return {
    product,
    user,
    loggedIn
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createLineItem: (lineItem) => dispatch(createLineItem(lineItem,history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
