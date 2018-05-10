import axios from 'axios';

// ------ constants ----
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const SET_ORDER = 'SET_ORDER';

// ---- action creators
export const getOrders = () => {
  return dispatch => {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        dispatch({
          type: GET_ORDERS,
          orders
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const createOrder = order => {
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

export const updateOrder = order => {
  return dispatch => {
    return axios.put(`/api/orders/${order.id}`, order)
      .then(() => {
        dispatch({
          type: UPDATE_ORDER,
          order
        });
      })
      .catch(err => console.log(err));
  };
};


export const setOrder = (id, order, history ) => {
  return (dispatch) => {
    return axios.put(`/api/orders/status/${order.id}`, order)
    .then(res => res.data)
    .then(order =>
      dispatch({
        type: SET_ORDER,
        order
      })
    )
    .catch(err => console.log(err))
  };
};

// ------ orders reducer
const orders = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...state, action.order];
    case UPDATE_ORDER:
      return state.map(order => order.id === action.order.id ? action.order : order );
    case SET_ORDER:
      return state.map(order => order.id === action.order.id ? action.order : order );
  }
  return state;
};

export default orders;
