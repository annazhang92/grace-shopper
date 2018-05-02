import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

// reducers
import products from './products';
import addresses from './addresses';
import categories from './categories';
import user from './user';
import orders from './orders';
import usersReducer from './users';
import lineItems from './lineItems';
import reviews from './reviews';


const reducer = combineReducers({
  products,
  categories,
  user,
  orders,
  lineItems,
  addresses,
  users: usersReducer,
  reviews: reviews
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
export * from './addresses';
export * from './products';
export * from './categories';
export * from './user';
export * from './users';
export * from './orders';
export * from './lineItems';
export * from './reviews';


