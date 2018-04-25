import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';


const ProductDetail = ({ product }) => {
  return (
    <div className="container">
      {product &&
      <div>
        <h2>{product.name}</h2>
        <div>
          <button className="btn btn-warning">Add to Cart</button>
          {/* onClick={()=>addProductToCart(this.props.product.id)} */}
        </div>
        <img src={product.imageUrl}></img>
        <p><strong>Price</strong> {product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
      </div>
      }
    </div>
  );
}

const mapStateToProps = ({ products }, { id }) => {
  const product = products.find( product => product.id === id);
  return {
    product
  };
}
  
const mapDispatchToProps = (dispatch, { history })=> {
  return {
    // addProductToCart:(id)=>dispatch(addProductToCart(id,history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);