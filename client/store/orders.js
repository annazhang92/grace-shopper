import axios from 'axios';


// ------ constants ----
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';


// ---- action creators
export const getOrders = () => {
  return (dispatch) => {
    return axios.get('/api/orders')
    .then(res => res.data)
    .then(orders =>
        dispatch({
          type: GET_ORDERS,
          orders
        })
      )
    .catch(err =>
      console.log(err)
    )
  };
};

export const createOrder = ( order ) => {
  return (dispatch) => {
    return axios.post('/api/orders', order)
    .then(res => res.data)
    .then(order =>
      dispatch({
        type: CREATE_ORDER,
        order
      })
    )
    .catch(err => console.log(err))
  };
};

// ------ products reducer
const orders = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...state, action.order];
  }
  return state;
};

export default orders;
