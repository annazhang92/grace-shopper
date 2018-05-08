import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// store-related
import { connect } from 'react-redux';
import { getProducts, getCategories, getUserFromToken, getUsers, getLineItems, getOrders, getAddresses, getReviews } from '../store';

import Home from './Home';
import Products from './Products';
import Menu from './Menu';
import Categories from './Categories';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import CheckOut from './CheckOut';
import OrderComplete from './OrderComplete';
import UserForm from './UserAccount';
import Users from './Users';
import PastOrders from './PastOrders';
import ProductForm from './ProductForm';

class App extends Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
    this.props.getUser();
    this.props.getUsers();
    this.props.getLineItems();
    this.props.getOrders();
    this.props.getAddresses();
    this.props.getReviews();
    // this.props.getUsers();
  }

  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Route path="/" exact component={ Home } />
          <Route exact path="/products/categories" component={ Categories } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/products/:id" render={ ({ match, history }) => <ProductDetail id={ match.params.id * 1 } history={ history } /> } />
          <Route exact path="/products/categories/:id" render={ ({ match, history }) => <Products id={ match.params.id * 1 } history={ history } /> } />
          <Route exact path="/login" render={({ history }) => <LoginForm history={ history } /> } />
          <Route exact path="/register" component={ RegisterForm } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/orders/:id" render={ ({ match, history }) => <CheckOut id={ match.params.id * 1 } history={ history } /> } />
          <Route exact path="/complete" component={()=> <OrderComplete /> } />
          <Route exact path="/users" component={ Users } />
          <Route exact path="/users/:id" component={ ({match }) => <UserForm currentUserId={ match.params.id * 1 } /> } />
          <Route exact path="/pastorders" component={ PastOrders } />
          <Route exact path="/userform" component={ UserForm } />
          <Route exact path="/productform/:id" component={({ match }) => <ProductForm productId={ match.params.id * 1 } /> } />
          <Route exact path="/productform" component={ ProductForm } /> 
        </div>
      </Router>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
    getLineItems: () => dispatch(getLineItems()),
    getOrders: () =>dispatch(getOrders()),
    getUsers: () => dispatch(getUsers()),
    getAddresses: () => dispatch(getAddresses()),
    getReviews: () => dispatch(getReviews()),
    getUser: () => {
      if (window.localStorage.getItem('token')) {
        dispatch(getUserFromToken(window.localStorage.getItem('token')))
      }
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
