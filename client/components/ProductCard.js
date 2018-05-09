import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { updateLineItem, deleteLineItem } from '../store';
import { connect } from 'react-redux';

import StarRatingComponent from 'react-star-rating-component';

import ProductForm from './ProductForm';


// const ProductCard = ({ products, lineItems, updateLineItem, deleteLineItem, loggedIn }) => {
class ProductCard extends Component {
  constructor({ products, lineItems, updateLineItem, deleteLineItem, loggedIn }) {
    super();
    this.state = {
      lineItems:[]
    };
    this.deleteInStorage=this.deleteInStorage.bind(this);
    this.updateInStorage=this.updateInStorage.bind(this);
  }

  deleteInStorage (id) {
    var lineItems = JSON.parse(localStorage.getItem('lineItems'));
    var newId=0;
    for (var i =0; i<lineItems.length; i++){
      if (lineItems[i].productId===id){
        newId=i;
      }
    }

    lineItems.splice(newId,1);
    store.dispatch({
      type: 'DELETE_LINEITEM_STORAGE',
      lineItem: {id}
    });
    localStorage.setItem('lineItems', JSON.stringify(lineItems));

  }

  updateInStorage(lineItemNew,id){
    console.log(lineItemNew)
    var lineItems = JSON.parse(localStorage.getItem('lineItems'));
    var newId=0;
    for (var i =0; i<lineItems.length; i++){
      if (lineItems[i].productId===id){
        newId=i;
      }
    }
    lineItems.splice(newId,1);
    store.dispatch({
      type: 'DELETE_LINEITEM_STORAGE',
      lineItem: {id}
    })
    lineItems.push(lineItemNew);
    store.dispatch({
      type: 'CREATE_LINEITEM_STORAGE',
      lineItemNew
    })
    localStorage.setItem('lineItems', JSON.stringify(lineItems));

  }

  render() {
    const { products, lineItems, updateLineItem, deleteLineItem, loggedIn, user } = this.props;
    
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
                    {product.inventory ? <img alt="product here" src={ product.imageUrl } /> : <img alt="product here" className="no-inventory" src={ product.imageUrl } />}
                    
                  </span>
                  <Link to={ `/products/${product.id}` }>
                    <h3>{product.name}</h3>
                  </Link>
                  {!product.inventory ? <h4>This product is out of stock!</h4> : <h4>Only {product.inventory} left</h4>}
                  <span className="price">
                    Price: ${product.price}
                  </span>
                  <div style={{fontSize: 16, display:'flex',justifyContent:'center'}}>
                    <StarRatingComponent
                      name="rate1"
                      editing={false}
                      starCount={5}
                      value={4.5}
                    />
                    <span>({Math.floor(Math.random() * 200) + 1})</span>
                  </div>
                  {user.isAdmin ? <Link to={`/productform/${product.id}`}>EDIT PRODUCT</Link> : null}
                  <br></br>
                  {lineItem && loggedIn?
                    <div>
                      <button onClick={ () => lineItem.quantity>1 ? updateLineItem(lineItem.id, { quantity: lineItem.quantity - 1 }) : null }>-</button>
                      <span className="price">Quantity: {lineItem.quantity}</span>
                      <button onClick={ () => product.inventory>lineItem.quantity ? updateLineItem(lineItem.id, { quantity: lineItem.quantity + 1 }) : null }>+</button>
                      <br></br>
                      <button onClick={ () => deleteLineItem(lineItem.id) }>Delete</button>
                    </div>
                    : null
                  }
                  {lineItem && !loggedIn?
                    <div>
                      <button onClick={ () => lineItem.quantity>1 ? this.updateInStorage({ productId: product.id, quantity: lineItem.quantity - 1, price: product.price, name: product.name, active: true }, lineItem.productId):null }>-</button>
                      <span className="price">Quantity: {lineItem.quantity}</span>
                      <button onClick={ () => product.inventory>lineItem.quantity ? this.updateInStorage({ productId: product.id, quantity: lineItem.quantity + 1, price: product.price, name: product.name, active: true }, lineItem.productId):null }>+</button>
                      <br></br>
                      <button onClick={ () => this.deleteInStorage(lineItem.productId) }>Delete</button>
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
  }
}

const mapStateToProps = ({ user }) => {
  const loggedIn = !!user.id;
  return {
    loggedIn,
    user
  };
}


const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateLineItem: (id, lineItem) => dispatch(updateLineItem(id, lineItem, history)),
    deleteLineItem: (id) => dispatch(deleteLineItem(id, history)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
