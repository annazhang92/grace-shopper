import axios from 'axios';

// ------ constants ----
const GET_CATEGORIES = 'GET_CATEGORIES';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const CREATE_CATEGORY = 'CREATE_CATEGORY';


// ---- action creators
export const getCategories = () => {
  return dispatch => {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        dispatch({
          type: GET_CATEGORIES,
          categories
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateCategory = (category) => {
  return (dispatch) => {
    return axios.put(`/api/categories/${category.id}`, category)
    .then(() => {
      dispatch({
        type: UPDATE_CATEGORY,
        category
      })
    })
    .catch(err => console.log(err))
  }
}

export const createCategory = (category) => {
  return (dispatch) => {
    return axios.post('/api/categories', category)
      .then(res => res.data)
      .then(category => {
        dispatch({
          type: CREATE_CATEGORY,
          category
        })
      })
  }
}


// ------ categories reducer
const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      state = action.categories;
      break;
    case CREATE_CATEGORY:
      state = [...state, action.category];
      break;
    case UPDATE_CATEGORY:
      state = state.map(category => category.id === action.category.id ? action.category : category);
      break;
  }
  return state;
};

export default categories;
