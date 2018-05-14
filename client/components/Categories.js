import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { PageHeader } from 'react-bootstrap';
import CategoryCard from './CategoryCard';
import RaisedButton from 'material-ui/RaisedButton';

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
          <br />
          {user.isAdmin ? <RaisedButton label="Add Category" onClick={ onAddCategory } primary/> : null}
          <br />       
          <LazyLoad>
            <CategoryCard categories={ categories } />
          </LazyLoad>
          
        </div>
      );
    };
    return (
      <div>
        <br />
        {user.isAdmin ? <RaisedButton label="Add Category" onClick={ onAddCategory } primary/> : null};
        <br />
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

