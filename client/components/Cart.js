import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import store, { createOrder } from '../store';
import { Link } from 'react-router-dom';


class Cart extends Component {
  constructor({ products, thisUserProducts, thisUserlineItems, loggedIn, createOrder, user, lineItems }) {
    super();
    this.state = {
      lineItems: []
    };
  }

  componentWillMount() {
    // localStorage.getItem('lineItems') && this.setState({lineItems: JSON.parse(localStorage.getItem('lineItems'))})
    if(!this.props.loggedIn){
    if(localStorage.getItem('lineItems')) {
      const lineItems = JSON.parse(localStorage.getItem('lineItems'))
      store.dispatch({
        type: 'GET_LINEITEMS',
        lineItems
      })
    }
  }
    
  }

  render() {
    const { products, thisUserProducts, thisUserlineItems, loggedIn, createOrder, user, lineItems} = this.props;
    const totalPrice = thisUserlineItems.reduce(function (acc, thisUserlineItem) {
      return acc + Number(thisUserlineItem.price)* thisUserlineItem.quantity;
    }, 0);

    const orderDescription = thisUserlineItems.reduce(function (acc, thisUserlineItem) {
      return acc + thisUserlineItem.name + thisUserlineItem.quantity +'/';
    }, '');

    // if (!loggedIn) {
    //   const thisUserlineItems = lineItems;
    //   const idArr = thisUserlineItems.map(thisUserlineItems => thisUserlineItems.productId);
    //   const thisUserProducts = products.filter(product => idArr.includes(product.id));
    //   console.log('wasds')
    //   console.log(thisUserlineItems)
    //   console.log(thisUserProducts)
    // }

    return (
      <div>
        <PageHeader>Cart Items</PageHeader>
        {/* {thisUserlineItems && <p>{thisUserlineItems[0].name}</p>} */}
        {thisUserlineItems && thisUserProducts ? <ProductCard products={ thisUserProducts } lineItems={thisUserlineItems}/> : <h2>Your cart is empty!</h2>}
        <h2>TotalPrice: {totalPrice} dollar</h2>
        <Link to={ `/orders/${user.id}` }><button onClick= { () => loggedIn? createOrder ({ description: orderDescription, price: totalPrice, userId: user.id, fullName: 'placeholder', address: 'placeholder', creditCardNumber: 12345678 }) : console.log ('please login') }>CheckOut</button></Link>
      </div>
    );
  }
}


const mapStateToProps = ({ lineItems, user, products }) => {
  const thisUserlineItemsAll = lineItems.filter(lineItem => lineItem.active === true)
  const thisUserlineItems = thisUserlineItemsAll.filter(lineItem => lineItem.userId === user.id);
  const idArr = thisUserlineItems.map(thisUserlineItems => thisUserlineItems.productId);
  const thisUserProducts = products.filter(product => idArr.includes(product.id));
  const loggedIn = !!user.id;
  return {
    lineItems,
    thisUserlineItems,
    thisUserProducts,
    loggedIn,
    products,
    user
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createOrder: (order) => dispatch(createOrder(order, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
