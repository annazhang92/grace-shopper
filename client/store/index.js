import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

const reducer = combineReducers({
  products
});

const store = createStore(reducer, applyMiddleware(thunk)) //logger));

export default store;
export * from './products';
