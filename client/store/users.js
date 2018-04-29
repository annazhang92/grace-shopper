import axios from 'axios';

// ------- constants ----
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';

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

export const createUser = (user, history) => {
  return (dispatch) => {
    console.log(`create user ${user}`)
    return axios.post('/api/users',user)
      .then( res => res.data)
      .then( user => {
        dispatch({
          type: CREATE_USER,
          user
        });
        history.push('/products')
      })
  };
};
// --- products reducer
const usersReducer = ( state = [], action ) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
  }
  return state;
};

export default usersReducer;
