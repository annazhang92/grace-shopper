import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts,getCategories } from '../store';
import store from '../store';
import { Provider } from 'react-redux';

import Products from './Products';
import Nav from './Nav';
import Filter from './Filter';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class App extends Component {
  componentDidMount() {
    console.log('componentMount', this.props);
    this.props.getProducts();
    this.props.getCategories();
  }

  render() {
    return (
      // <Provider store={ store }> why we don't need provider here?
      <Router>
        <div>
          <Nav/>
          {/* I took out Switch here...maybe we should add it back... */}
            <Route path="/products" component={ Filter } />
            <Route exact path="/products" component={ Products } />
            <Route exact path="/products/categories/:id" render={({ match, history })=> <Products id={ match.params.id*1} history={ history }/> } />
            <Route exact path="/login" component={ LoginForm } />
            <Route exact path="/register" component={ RegisterForm } />
        </div>
      </Router>
      // </Provider>
    );
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories:()=>dispatch(getCategories())
  }
};

export default connect(null, mapDispatchToProps)(App);
