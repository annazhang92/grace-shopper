import axios from 'axios';

// ------- constants ----
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE USER';

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

export const updateUser = (user) => {
  return (dispatch) => {
    return axios.put(`/api/users/${user.id}`, user)
      .then(() => {
        dispatch({
          type: UPDATE_USER,
          user
        });
      })
  };
};
// --- users reducer
const usersReducer = ( state = [], action ) => {
  switch (action.type) {
    case GET_USERS:
      state = action.users;
    case CREATE_USER:
      state = [...state, action.user];
    case UPDATE_USER:
      state = state.map(user => user.id === action.updateUser.id ? action.user : user)
  }
  return state;
};

export default usersReducer;
