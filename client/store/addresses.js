import axios from 'axios';

/*// ------ constants ----
const GET_ADDRESSES = 'GET_ADDRESSES';

// ----- action creators
export const getAddresses = () => {
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

// ------ addresses reducer
const addresses = (state = [], action) => {
  switch(action.type) {
    case GET_ADDRESSES:
      return action.addresses;
  }
  return state;
};

export default addresses;
*/

// ------ constants ----
const GET_ADDRESSES = 'GET_ADDRESSES';


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

// ------ addresses reducer
const addresses = (state = [], action) => {
  switch (action.type) {
    case GET_ADDRESSES:
      return action.addresses;
  }
  return state;
};

export default addresses;