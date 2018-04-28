import axios from 'axios';

// ------- constants ----
const GET_USERS = 'GET_USERS';

// --- action creators
export const getUsers = () => {
  return (dispatch) => {
    return axios.get('/api/users')
      .then( res => res.data)
      .then( users => dispatch({
        type: GET_USERS,
        users
      }))
  };
};

// --- products reducer
const users = ( state = [], action ) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
  }
  return state;
};

export default users;
