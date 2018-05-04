/* eslint-disable */
import axios from 'axios';
// ------ constants ----
const GET_REVIEWS = 'GET_REVIEWS'
const CREATE_REVIEW = 'CREATE_REVIEW';

// ---- action creators
export const getReviews = () => {
  return (dispatch) => {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch({
        type: GET_REVIEWS,
        reviews
      }))
      .catch(err =>
        console.error(err)
      );
  };
};

export const createReview = (review) => {
  return (dispatch) => {
    return axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(review => dispatch({
        type: CREATE_REVIEW,
        review
      }))
      .catch(err =>
        console.error(err)
      );
  };
};

// ------ products reducer

const reviews = ( state = [], action ) => {
  switch(action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case CREATE_REVIEW:
      return [...state, action.review];
  }
  return state;
}

export default reviews;
