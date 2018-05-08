import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateProduct, createProduct } from '../store';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    const { product } = props;
    this.state = {
      id: product ? product.id : '',
      name: product ? product.name : '',
      description: product ? product.description : '',
      imageUrl: product ? product.imageUrl : '',
      price: product ? product.price : '',
      inventory: product ? product.inventory : '',
      categoryId: product ? product.categoryId : '',
      isUpdating: false
    }
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onChangeProduct(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  
  onUpdate(ev) {
    ev.preventDefault();
    const { product, createProduct, updateProduct } = this.props;
    const { id, name, description, imageUrl, price, inventory, categoryId } = this.state;
    const newProductInfo = { id, name, description, imageUrl, price, inventory, categoryId };
    console.log(newProductInfo);
    product ? updateProduct(newProductInfo) : createProduct(newProductInfo);
    this.setState({ isUpdating: false });
  }

  render() {
    const { onChangeProduct, onUpdate } = this;
    const { product } = this.props;
    const { name, description, imageUrl, price, categoryId, isUpdating } = this.state;
    const inputs = {
      name: 'Name',
      description: 'Description',
      imageUrl: 'Image URL',
      price: 'Price',
      inventory: 'Inventory',
      categoryId: 'Category Id'
    }
    return (
      <div>
        {product ? <h2>Update Product</h2> : <h2>Create Product</h2>}
        <form>
          {
            Object.keys(inputs).map(input => {
              return (
                <div className="" key={input}>
                <label className="font-weight-bold">{inputs[input]}</label>
                <input
                  name={input}
                  readOnly={isUpdating ? false : true}
                  className={`form-control${isUpdating ? `` : `plaintext` }`}
                  onChange={onChangeProduct}
                  value={this.state[input]}
                />
                </div>
              )
            })
          }
        </form>
        {
          isUpdating ? (
            <button onClick={ onUpdate } className='btn btn-primary'>Save</button>
          ) : (
            <button onClick={() => this.setState({ isUpdating: true })} className='btn btn-primary'>I want to make changes!</button>
          )
        }
      </div>
    )
  }

}

const mapState = ({ products }, { productId }) => {
  const product = products.find(product => product.id === productId);
  return {
    product
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product)),
    createProduct: (product) => dispatch(createProduct(product))
  }
}

export default connect(mapState, mapDispatch)(ProductForm);
