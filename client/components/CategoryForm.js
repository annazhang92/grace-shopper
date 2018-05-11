import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateCategory, createCategory } from '../store';

class CategoryForm extends Component {
  constructor(props) {
    super(props)
    const { category } = props;
    this.state = {
      id: category ? category.id : '',
      name: category ? category.name : '',
      imageUrl: category ? category.imageUrl : '',
      isUpdating: false
    }
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onChangeCategory(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault();
    const { category, updateCategory, createCategory } = this.props;
    const { id, name, imageUrl } = this.state;
    const newCategoryInfo = { id, name, imageUrl };
    category ? updateCategory(newCategoryInfo) : createCategory(newCategoryInfo);
    this.setState({ isUpdating: false });
  }

  render() {
    const { onChangeCategory, onUpdate } = this;
    const { category } = this.props;
    const { name, imageUrl, isUpdating } = this.state;
    const buttonText = category ? 'I want to make changes!' : 'I want to create a new category!';
    const inputs = {
      name: 'Name',
      imageUrl: 'Image URL'
    }
    return (
      <div>
        {category ? <h2>Update Category</h2> : <h2>Create Category</h2>}
        <form>
          {
            Object.keys(inputs).map(input => {
              return (
                <div key={input}>
                  <label >{inputs[input]}</label>
                  <input
                    name={input}
                    readOnly={isUpdating ? false : true}
                    onChange={onChangeCategory}
                    value={this.state[input]}
                  />
                </div>
              )
            })
          }
        </form>
        {
          isUpdating ? (
            <button onClick={ onUpdate } >Save</button>
          ) : (
            <button onClick={() => this.setState({ isUpdating: true })} >{buttonText}</button>
          )
        }
      </div>
    )
  }
}

const mapState = ({ categories }, { categoryId }) => {
  const category = categoryId ? categories.find(category => category.id === categoryId) : '';
  console.log(category);
  return {
    category
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateCategory: (category) => dispatch(updateCategory(category)),
    createCategory: (category) => dispatch(createCategory(category))
  }
}

export default connect(mapState, mapDispatch)(CategoryForm);