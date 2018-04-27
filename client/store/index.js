import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

// reducers
import products from './products';
import categories from './categories';
import user from './user';

const reducer = combineReducers({
  products,
  categories,
  user
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
export * from './products';
export * from './categories';
export * from './user';
