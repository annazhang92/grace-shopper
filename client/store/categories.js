import axios from 'axios';


//------ constants ----
const GET_CATEGORIES = 'GET_CATEGORIES';


//---- action creators
export const getCategories = () => {
  return (dispatch) => {
    return axios.get('/api/categories')
      .then( res => res.data)
      .then( categories => {
        dispatch({
          type: GET_CATEGORIES,
          categories
        })
      })
      .catch(err => {
        console.log(err)
      })
  };
};

// ------ categories reducer
const categories = (state = [], action) => {
  switch(action.type){

    case GET_CATEGORIES:
      return action.categories;

  }
  return state;
};

export default categories;
