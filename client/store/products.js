import axios from "axios";


//------ constants ----
const GET_PRODUCTS = 'GET_PRODUCTS';


//---- action creators
export const getProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then( res => res.data)
      .then( products => {
        disatch({
          type: GET_PRODUCTS,
          products
        })
      })
      .catch(err => {
        console.log(err)
      })
  };
};

// ------ products reducer
const products = (state = [], action) => {
  switch(action.type){

    case GET_PRODUCTS:
      return action.products;

  }
  return state;
};

export default products;
