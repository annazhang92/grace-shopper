import axios from 'axios';



// ------ constants ----
const GET_REVIEWS = 'GET_REVIEWS;
const CREATE_REVIEW = 'CREATE_REVIEW;

// ---- action creators
export const getReviewsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch(getReviews(reviews)))
      .catch(err => console.error(err))
  }
}

export const createReviewOnServer = (review) => {
  return (dispatch) => {
    return axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(review => dispatch(createReview(review)))
      .catch(err => console.error(err))
  }
}

// ------ products reducer

const reviews = ( state = [], action ) => {
  switch(action.type) {

    case GET_REVIEWS:
      state = action.reviews;
      break;

    case CREATE_REVIEW:
      state = [ ...state, action.review ];
      break;

  }
  return state;
}


export default reviews;
