import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { PageHeader } from 'react-bootstrap';
import CategoryCard from './CategoryCard';

//const Categories = ({ categories }) => {
class Categories extends Component {
  constructor() {
    super();
    this.onAddCategory = this.onAddCategory.bind(this);
  }

  onAddCategory() {
    window.location = '/#/categoryform';
  }

  render() {
    const { onAddCategory } = this;
    const { user, categories } = this.props;
    if (categories) {
      return (      
        <div>
        {user.isAdmin ? <button onClick={ onAddCategory } className='btn btn-primary'>ADD CATEGORY</button> : null}         
          <LazyLoad>
            <CategoryCard categories={ categories } />
          </LazyLoad>
        </div>
      );
    };
    return (
      <div>
        {user.isAdmin ? <button onClick={ onAddCategory } className='btn btn-primary'>ADD CATEGORY</button> : null};
        <PageHeader>There are no categories currently available</PageHeader>;
      </div>
    )
  }
}

const mapStateToProps = ({ categories, user }) => {
  return {
    categories,
    user
  };
};

export default connect(mapStateToProps)(Categories);

