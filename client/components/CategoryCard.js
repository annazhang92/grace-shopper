import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryForm from './CategoryForm';

const CategoryCard = ({ categories, user }) => {
  return (
    <div className="wrapper">
      {
        categories ?
        categories.map(category => {
          return (
            <div key={ category.id }>
              <div className="card card-1">
                <span className="card-header">
                  <img alt="product here" src={ category.imageUrl } />
                </span>
                <Link to={ `/products/categories/${category.id}` }>
                  <h3>{category.name}</h3>
                </Link>
                {user.isAdmin ? <Link to={`/categoryform/${category.id}`}>EDIT CATEGORY</Link> : null}
              </div>              
            </div>
          );
        })
        :
        null
      }
    </div>
  );
};

const mapState = ({ user }) => {
  return {
    user
  }
}

export default connect(mapState)(CategoryCard);
