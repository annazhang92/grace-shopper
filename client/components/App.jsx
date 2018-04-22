import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../store';

import Products from './Products';

class App extends Component {
  componentDidMount() {
    console.log('componentMount', this.props);
    this.props.getProducts();
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/products' component={ Products } />
          </Switch>
        </div>
      </Router>
    )
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    getProducts: () => dispatch(getProducts())
  }
};

export default connect(null, mapDispatchToProps)(App);
