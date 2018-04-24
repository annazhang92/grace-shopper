import axios from 'axios';

const SET_USER = 'SET_USER';

const setUser = (user) => ({ type: SET_USER, user });

export const getUserFromToken = (token) => {
  return (dispatch) => {
    return axios.get(`/api/sessions/${token}`)
      .then( res => res.data)
      .then( user => dispatch({
        type: SET_USER,
        user
      })
  }
}

export const attemptLogin = (credentials) => {
  return (dispatch) => {
    return axios.post('/api/sessions', credentials)
      .then( res => window.localStorage.setItem('token', res.data))
      .then( () => dispatch(getUserFromToken(window.localStorage.getItem('token'))))
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    dispatch({
      type: SET_USER,
      user: {}
    });
  }
}

export const updateLoggedUser = (user) => {
  return (dispatch) => {
    dispatch(updateAuthUser(user));
  }
}

const user = (state = {}, action) => {
  switch(action.type) {
    case SET_USER:
      state = action.user
      break;
  };
  return state;
};

export default user;
