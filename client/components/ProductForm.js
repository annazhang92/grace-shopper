import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { updateProduct, createProduct } from '../store';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    const { product } = props;
    this.state = {
      id: product ? product.id : '',
      name: product ? product.name : '',
      nameError: '',
      description: product ? product.description : '',
      descriptionError: '',
      imageUrl: product ? product.imageUrl : '',
      imageUrlError: '',
      price: product ? product.price : '',
      priceError: '',
      inventory: product ? product.inventory : '',
      inventoryError: '',
      categoryId: product ? product.categoryId : '',
      categoryIdError: '',
      isUpdating: false
    }
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  validate (){
    let isError = false;
    if(this.state.firstNameError.length <= 1){
      isError = true;
      this.setState({nameError: "Your product's name must be at least 2 characters long."});
    }

    if(this.state.description.length <= 1){
      isError = true;
      this.setState({descriptionError: "Your description must be at least 10 characters long."});

    }

    if(this.state.imageUrl.indexOf('@') === -1 && this.state.email.indexOf('.') === -1){
      isError = true;
      this.setState({imageUrlError: "Please include a valid image URL."});
    }

    if(this.state.price.length < 7){
      isError = true;
      this.setState({priceError: "Please enter a valid price."});
    }

    if(this.state.inventory.length < 7){
      isError = true;
      this.setState({inventoryError: "Please enter a valid price."});
    }

    if(this.state.categoryId.length < 7){
      isError = true;
      this.setState({cateogryIdError: "Please enter a valid price."});
    }

    
    if(isError){
    }
    return isError;
  }

  onChangeProduct(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  
  onUpdate(ev) {
    ev.preventDefault();
    if(!this.validate()){
      const { product, createProduct, updateProduct } = this.props;
      const { id, name, description, imageUrl, price, inventory, categoryId } = this.state;
      const newProductInfo = { id, name, description, imageUrl, price, inventory, categoryId };
      product ? updateProduct(newProductInfo) : createProduct(newProductInfo);
      this.setState({ isUpdating: false });
    }
  }

  render() {
    const { onChangeProduct, onUpdate } = this;
    const { product } = this.props;
    const { name, description, imageUrl, price, categoryId, isUpdating } = this.state;
    const buttonText = product ? 'I want to make changes!': 'I want to create a new product!';
    const inputs = {
      name: 'Name',
      description: 'Description',
      imageUrl: 'Image URL',
      price: 'Price',
      inventory: 'Inventory',
      categoryId: 'Category ID'
    }
    return (
      <div>
        {product ? <h2>Update Product</h2> : <h2>Create Product</h2>}
        <form>
          {
            Object.keys(inputs).map(input => {
              return (
                <div key={input}>
                <br />
                <TextField
                  name={input}
                  floatingLabelText={inputs[input]}
                  readOnly={isUpdating ? false : true}
                  onChange={onChangeProduct}
                  value={this.state[input]}
                  floatingLabelFixed={true}
                />
                </div>
              )
            })
          }
        </form>
        <br />
        {
          isUpdating ? (
            <RaisedButton label="Save" onClick={ onUpdate } primary/>
          ) : (
            <RaisedButton label={buttonText} onClick={() => this.setState({ isUpdating: true })}/>
          )
        }
      </div>
    )
  }

}

const mapState = ({ products }, { productId }) => {
  const product = productId ? products.find(product => product.id === productId) : '';
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
