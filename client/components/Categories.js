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
    return (
      <div>
        <PageHeader>There are no categories currently available</PageHeader>;
        <br />
        {user.isAdmin ? <button onClick={ onAddCategory } className='btn btn-primary'>ADD CATEGORY</button> : null}
        <LazyLoad>
          <CategoryCard categories={ categories } />
        </LazyLoad>

      </div>
    ) 
  }
};

const mapStateToProps = ({ categories, user }) => {
  return {
    categories,
    user
  };
};

export default connect(mapStateToProps)(Categories);

