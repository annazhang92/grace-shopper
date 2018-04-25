import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// store-related
import { connect } from 'react-redux';
import { getProducts, getCategories } from '../store';

import Home from './Home';
import Products from './Products';
import Menu from './Menu';
import Categories from './Categories';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Cart from './Cart';
import ProductDetail from './ProductDetail';

class App extends Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
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
          <Route exact path="/login" component={ LoginForm } />
          <Route exact path="/register" component={ RegisterForm } />
          <Route exact path="/cart" component={ Cart } />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories())
  };
};

export default connect(null, mapDispatchToProps)(App);
