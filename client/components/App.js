import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

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
import CategoryForm from './CategoryForm';
import HeatMap from './Dashboard';
import AdminDashboard from './AdminDashboard';
import TopBottom from './TopBottom';

//Needed for onTouchTap
injectTapEventPlugin();

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
    /*const revenueByProduct = [
      {id: 1, name: 'chocolate', revenue: 1000},
      {id: 2, name: 'cookie', revenue: 500},
      {id: 3, name: 'ice cream', revenue: 200},
      {id: 4, name: 'cake', revenue: 300},
      {id: 5, name: 'brownie', revenue: 400},
      {id: 6, name: 'pie', revenue: 700},
      {id: 7, name: 'candy', revenue: 800},
      {id: 8, name: 'smores', revenue: 900},
    ]*/
    return (
      <Router>
        <div>
          <Menu />
          <MuiThemeProvider><Route path="/" exact component={ Home } /></MuiThemeProvider>
          <Route exact path="/products/categories" component={ Categories } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/products/:id" render={ ({ match, history }) => <ProductDetail id={ match.params.id * 1 } history={ history } /> } />
          <Route exact path="/products/categories/:id" render={ ({ match, history }) => <Products id={ match.params.id * 1 } history={ history } /> } />
          <MuiThemeProvider><Route exact path="/login" render={({ history }) => <LoginForm history={ history } /> } /></MuiThemeProvider>
          <MuiThemeProvider><Route exact path="/register" component={ RegisterForm } /></MuiThemeProvider>
          <MuiThemeProvider><Route exact path="/cart" component={ Cart } /></MuiThemeProvider>
          <MuiThemeProvider><Route exact path="/orders/:id" render={ ({ match, history }) => <CheckOut id={ match.params.id * 1 } history={ history } /> } /></MuiThemeProvider>
          <Route exact path="/complete" component={()=> <OrderComplete /> } />
          <Route exact path="/users" component={ Users } />
          <Route exact path="/users/:id" component={ ({match }) => <UserForm currentUserId={ match.params.id * 1 } /> } />
          <Route exact path="/pastorders" component={ PastOrders } />
          <MuiThemeProvider><Route exact path="/userform" component={ UserForm } /></MuiThemeProvider>
          <Route exact path="/productform/:id" component={({ match }) => <ProductForm productId={ match.params.id * 1 } /> } />
          <MuiThemeProvider><Route exact path="/productform" component={ ProductForm } /></MuiThemeProvider>
          <Route exact path="/categoryform/:id" component={({ match }) => <CategoryForm categoryId={ match.params.id * 1 } /> } />
          <MuiThemeProvider><Route exact path="/categoryform" component={ CategoryForm } /></MuiThemeProvider>
          <Route exact path="/dashboard" component={ HeatMap } />
          <Route exact path="/admindashboard" component={ AdminDashboard } />
          <Route exact path="/topbottom" component={ TopBottom } />
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
