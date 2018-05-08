import axios from 'axios';

// ------ constants ----
const GET_PRODUCTS = 'GET_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

// ---- action creators
export const getProducts = () => {
  return dispatch => {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        dispatch({
          type: GET_PRODUCTS,
          products
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateProduct = (id, product, history ) => {
  return (dispatch) => {
    return axios.put(`/api/products/${id}`, product)
    .then(res => res.data)
    .then(product =>
      dispatch({
        type: UPDATE_PRODUCT,
        product
      })
    )
    .catch(err => console.log(err))
  };
};

export const createProduct = (product) => {
  return (dispatch) => {
    return axios.post('/api/products', product)
      .then(res => res.data)
      .then(product => {
        dispatch({
          type: CREATE_PRODUCT,
          product
        })
      })
  }
}

// ------ products reducer
const products = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      state = action.products;
      break;
    case UPDATE_PRODUCT:
      state = state.map(product => product.id === action.product.id ? action.product : product); 
      break;
    case CREATE_PRODUCT:
      state = [...state, state.product];
      break; 
  }
  return state;
};

export default products;
