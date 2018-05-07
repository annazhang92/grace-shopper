/* eslint-disable */
import React, { Component } from 'react';
import store, { createLineItem } from '../store';
import { connect } from 'react-redux';

import StarRatingComponent from 'react-star-rating-component';
import Reviews from './Reviews';
import ProductReview from './ProductReview';


class ProductDetail extends Component {
  constructor({ product, createLineItem, user, loggedIn, thisUserlineItems,id, productExist }) {
    super();
    this.state = {

    };

    this.fetchData=this.fetchData.bind(this);
    this.handleCreateLineItem=this.handleCreateLineItem.bind(this)
  }

  // componentWillMount(){
  //   localStorage.getItem('lineItem') && this.setState({lineItem: JSON.parse(localStorage.getItem('lineItem'))})
  //   console.log(this.state)
  // }

  fetchData(data){
    if(localStorage.getItem('lineItems') == null){
      var lineItems =[];
      lineItems.push(data);
      localStorage.setItem('lineItems', JSON.stringify(lineItems));
    } else {
      var lineItems = JSON.parse(localStorage.getItem('lineItems'));
      lineItems.push(data);
      localStorage.setItem('lineItems', JSON.stringify(lineItems));
    }
    // this.setState ({lineItems: JSON.parse(localStorage.getItem('lineItems')) })
    // store.dispatch({
    //   type: 'CREATE_LINEITEM',
    //   lineItem: JSON.parse(localStorage.getItem('lineItems'))
    // })
  }

  componentDidMount(){

  }

  handleCreateLineItem(){
    const { product, createLineItem, user, loggedIn, thisUserlineItems,id, productExist } = this.props;
    if(loggedIn && !productExist){
      createLineItem({ productId: product.id, userId: user.id, quantity: 1, price: product.price, name: product.name })  
    } else if (!loggedIn && !productExist){
      this.fetchData({ productId: product.id, userId: user.id, quantity: 1, price: product.price, name: product.name, active: true})
      window.location.reload();
      //i cheated here...i guess i shouldn't be using reload..
    }
  }


  render () {
    const { product, createLineItem, user, loggedIn, thisUserlineItems,id, productExist } = this.props;

    return (
    <div className="container">
      {product &&
      <div>
        <h2>{product.name}</h2>
        <div>
          {product.inventory<=0 ? <button className="btn btn-danger">Out of Stock</button> : null}
          {productExist && product.inventory>0 ? <button className="btn btn-success">In the Cart</button> : null}
          {!productExist && product.inventory>0 ?<button className="btn btn-primary" onClick={this.handleCreateLineItem}>Add to Cart</button>: null}

          
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
    )
  };
}

const mapStateToProps = ({ products, user, lineItems }, { id }) => {
  const product = products.find( product => product.id === id);
  const loggedIn = !!user.id;
  const thisUserlineItemsAll = lineItems.filter(lineItem => lineItem.active === true)
  const thisUserlineItems = thisUserlineItemsAll.filter(lineItem => lineItem.userId === user.id);
  var productExist =false;
  for(var i=0; i<thisUserlineItems.length; i++){
    if (thisUserlineItems[i].productId===id){
      productExist =true;
    } 
  }
  var lineItemsStorage = JSON.parse(localStorage.getItem('lineItems'));
  if(!loggedIn &&lineItemsStorage){
    for (var i =0; i<lineItemsStorage.length; i++){
      if (lineItemsStorage[i].productId===id){
        productExist =true;
      }
    }
  }

  
  return {
    product,
    user,
    loggedIn,
    thisUserlineItems,
    id,
    productExist
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createLineItem: (lineItem) => dispatch(createLineItem(lineItem,history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
