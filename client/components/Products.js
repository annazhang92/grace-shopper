import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    this.onAddProduct = this.onAddProduct.bind(this);
  };

  updateSearch(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onAddProduct() {
    window.location = '/#/productform';
  }

  render(){
    const { products, categories} = this.props;
    const { onAddProduct } = this;
    const { search, min, max } = this.state;
    const filteredProducts = products.filter( product => {
      return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 && (parseFloat(product.price) > min) && ( max > 0 ? parseFloat(product.price) < max : true);
    });
      const specials = products.filter( product => product.id > 6 && product.id < 12);

      return (
        <div>

        {
          (products && categories) ?
          <div>
            <PageHeader>{ categories.name } Products offered: { filteredProducts.length }
            <br />
            <button onClick={ onAddProduct } className='btn btn-primary'>ADD PRODUCT</button>
            </PageHeader>
            <div>
              <span>Product Name</span><input name='search' value={search} placeholder="Search..." onChange={this.updateSearch.bind(this)} />
              <input type='numeric' step='0.01' name='min' value={min} placeholder="$ Min" onChange={this.updateSearch.bind(this)} />
              <span> - </span>
              <input type='numeric' step='0.01' name='max' placeholder="$ Max" onChange={this.updateSearch.bind(this)} />
            </div>
            <div>
              <div className='ticker-wrap'>
              <div className='ticker'>
              {
                specials.map(special =>{
                  return(
                    <div className='ticker__item card-ticker card-1'>
                    <div style={{display:'flex', justifyContent:'row'}} >
                    <span className="card-header">
                      <img style={{height: '75px', width:'75px', padding:'4px'}} alt="product here" src={ special.imageUrl } />
                    </span>

                    <div style={{padding:'8px', display:'grid'}}>
                    <button style={{width: '100px'}} className="btn btn-warning btn-small" onClick={ () => loggedIn? createLineItem({ productId: product.id, userId: user.id, quantity: 1, price: product.price, name: product.name }) : console.log ('please login') }>Add to Cart</button>
                    <span style={{fontSize: 12}}>{special.name.substr(0,12)}
                    <span className='price' style={{fontSize: 12}}>: ${special.price}</span></span>
                    </div>

                    </div>
                    </div>
                  )
                })
              }
              </div>
              </div>
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

const mapStateToProps = ({ products, categories, loggedIn }, { id }) => {
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
