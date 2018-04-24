import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Filter = ({ categories }) => {
    return (
      <div>
      {
        categories.length ?
        categories.map(categorie=><li key={categorie.id}><Link to={`/products/categories/${categorie.id}`}>{categorie.name}</Link></li>)
        :
          <h2> There are no filter currently available </h2>
      }
    </div>
    );
  };

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Filter);

