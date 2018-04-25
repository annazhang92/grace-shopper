import React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';
import { PageHeader } from 'react-bootstrap';
import CategoryCard from './CategoryCard';

const Categories = ({ categories }) => {
  if (categories) {
    return (
      <div>
        <LazyLoad>
          <CategoryCard categories={ categories } />
        </LazyLoad>
      </div>
    );
  }
  return <PageHeader>There are no categories currently available</PageHeader>;
};

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Categories);

