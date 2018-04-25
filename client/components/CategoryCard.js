import React from 'react';
import { Link } from 'react-router-dom';


const CategoryCard = ({ categories }) => {
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

export default CategoryCard;
