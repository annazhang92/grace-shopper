import React, { Component } from 'react';
import { connect } from 'react-redux';
// this fixes image render from pinging the website too much at once
import LazyLoad from 'react-lazy-load';
import { PageHeader } from 'react-bootstrap';

import ProductCard from './ProductCard';

class Products extends Component {
  constructor(){
    super();
    this.state = {
      search: '',
      min: '',
      max: 0
    };
  };

  updateSearch(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render(){
    const { products, categories} = this.props;
    const { search, min, max } = this.state;
    const filteredProducts = products.filter( product => {
      return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 && (parseFloat(product.price) > min) && ( max > 0 ? parseFloat(product.price) < max : true);
    });
      return (
        <div>
        {
          (products && categories) ?
          <div>
            <PageHeader>{ categories.name } Products offered: { filteredProducts.length }
            </PageHeader>
            <div>
              <span>Product Name</span><input name='search' value={search} placeholder="Search..." onChange={this.updateSearch.bind(this)} />
              <input type='numeric' step='0.01' name='min' value={min} placeholder="$ Min" onChange={this.updateSearch.bind(this)} />
              <span> - </span>
              <input type='numeric' step='0.01' name='max' placeholder="$ Max" onChange={this.updateSearch.bind(this)} />

            </div>
            <LazyLoad>
              <ProductCard products={ filteredProducts } />
            </LazyLoad>
          </div>
          :
          <PageHeader>There are no products currently available</PageHeader>
        }
        </div>
      )
  }
};

const mapStateToProps = ({ products, categories }, { id }) => {
  if (id) {
    products = products.filter(product => product.categoryId === id);
    categories = categories.find(category => category.id === id);
  }
  return {
    products,
    categories
  };
};

export default connect(mapStateToProps)(Products);
