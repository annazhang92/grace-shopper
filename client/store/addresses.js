import axios from 'axios';

// ------ constants ----
const GET_ADDRESSES = 'GET_ADDRESSES';
const CREATE_ADDRESS = 'CREATE ADDRESS';
const UPDATE_ADDRESS = 'UPDATE ADDRESS';



// ---- action creators
export const getAddresses= () => {
  return dispatch => {
    return axios.get('/api/addresses')
      .then(res => res.data)
      .then(addresses => {
        dispatch({
          type: GET_ADDRESSES,
          addresses
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const createAddress = (address) => {
  return dispatch => {
    return axios.post('/api/addresses', address)
      .then(res => res.data)
      .then(address => {
        dispatch({
          type: CREATE_ADDRESS,
          address
        })
      });
  };
};

export const updateAddress = (address) => {
  return dispatch => {
    return axios.put(`/api/addresses/${address.id}`, address)
      .then(()=> {
        dispatch({
          type: UPDATE_ADDRESS,
          address
        })
      });
  };
}

// ------ addresses reducer
const addresses = (state = [], action) => {
  switch (action.type) {
    case GET_ADDRESSES:
      state = action.addresses;
      break;
    case CREATE_ADDRESS:
      state = [...state, action.address];
      break;
    case UPDATE_ADDRESS:
      state = state.map(address => address.id === action.address.id ? action.address : address);
      break;
  }
  return state;
};

export default addresses;