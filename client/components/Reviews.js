import React, { Component } from 'react';
import store, { createReviews } from '../store';
import { connect } from 'react-redux';

import StarRatingComponent from 'react-star-rating-component';

const Reviews = ({ reviews, user, loggedIn, product }) => {
  console.log('REVIEWS***', product);
  const productReviews = reviews.filter(review => review.productId === product.id);
  const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November", "December" ];
  return (
    <div className="container">
      { productReviews ?
        productReviews.map(review => {
          const date = new Date(review.createdAt);
          const reviewDate =  monthNames[date.getMonth()] + ', '+date.getDate() + ', ' + date.getFullYear();
          return(
            <div>
              <div key={ review.id } style={{display:'flex', justifyContent:'row'}}>
                <StarRatingComponent
                  name="rate1"
                  editing={false}
                  starCount={5}
                  value={review.rating}
                />
                <b> <span> s{ review.title } </span></b>
                <span> {reviewDate} </span>
              </div>
              <div style={{textAlign:'left'}}>
                {review.description}
              </div>
              <br/>
            </div>
          )

        })

        :
        null
      }
    </div>
  );
};

const mapStateToProps = ({ reviews, user }) => {
  const loggedIn = !!user.id;
  return {
    reviews,
    user,
    loggedIn
  };
};

// const mapDispatchToProps = (dispatch, { history }) => {
//   return {
//     createReview: (null) => dispatch(createReview(null,history)),
//   };
// };

export default connect(mapStateToProps)(Reviews);
