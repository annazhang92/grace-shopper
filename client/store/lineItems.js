import axios from 'axios';


// ------ constants ----
const GET_LINEITEMS = 'GET_LINEITEMS';
const CREATE_LINEITEM = 'CREATE_LINEITEM';
const UPDATE_LINEITEM = 'UPDATE_LINEITEM';
const DELETE_LINEITEM = 'DELETE_LINEITEM';
const SET_LINEITEM = 'SET_LINEITEM';
const DELETE_LINEITEM_STORAGE = 'DELETE_LINEITEM_STORAGE';
const CREATE_LINEITEM_STORAGE = 'CREATE_LINEITEM_STORAGE';


// ---- action creators
export const getLineItems = () => {
  return (dispatch) => {
    return axios.get('/api/lineItems')
    .then(res => res.data)
    .then(lineItems =>
        dispatch({
          type: GET_LINEITEMS,
          lineItems
        })
      )
    .catch(err =>
      console.log(err)
    )
  };
};

export const createLineItem = ( lineItem, history ) => {
  return (dispatch) => {
    return axios.post('/api/lineItems', lineItem)
    .then(res => res.data)
    .then(lineItem =>
      dispatch({
        type: CREATE_LINEITEM,
        lineItem
      })
    )
    .catch(err => console.log(err))
  };
};

export const updateLineItem = (id, lineItem, history ) => {
  return (dispatch) => {
    return axios.put(`/api/lineItems/${id}`, lineItem)
    .then(res => res.data)
    .then(lineItem =>
      dispatch({
        type: UPDATE_LINEITEM,
        lineItem
      })
    )
    .catch(err => console.log(err))
  };
};

export const setLineItem = (id, lineItem, history ) => {
  return (dispatch) => {
    return axios.put(`/api/lineItems/status/${id}`, lineItem)
    .then(res => res.data)
    .then(lineItem =>
      dispatch({
        type: SET_LINEITEM,
        lineItem
      })
    )
    .catch(err => console.log(err))
  };
};

export const deleteLineItem = ( id, history ) => {
  return (dispatch) => {
    return axios.delete(`/api/lineItems/${id}`)
    .then(res => res.data)
    .then(() =>
      dispatch({
        type: DELETE_LINEITEM,
        lineItem: {id}
      })
    )
    .catch(err => console.log(err))
  };
};



// ------ products reducer
const lineItems = (state = [], action) => {
  switch (action.type) {
    case GET_LINEITEMS:
      return action.lineItems;
    case CREATE_LINEITEM:
      return [...state, action.lineItem];
    case CREATE_LINEITEM_STORAGE:
      return [...state, action.lineItemNew];
    case UPDATE_LINEITEM:
      return state.map(lineItem => lineItem.id === action.lineItem.id ? action.lineItem : lineItem); 
    case DELETE_LINEITEM:
      return state.filter(lineItem => lineItem.id !== action.lineItem.id); 
    case DELETE_LINEITEM_STORAGE:
      return state.filter(lineItem => lineItem.productId !== action.lineItem.id); 
    case SET_LINEITEM:
      return state.map(lineItem => lineItem.id === action.lineItem.id ? action.lineItem : lineItem); 
  }
  return state;
};

export default lineItems;
