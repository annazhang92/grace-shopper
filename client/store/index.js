import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

//reducers
import products from './products';

const reducer = combineReducers({
  products
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
export * from './products';
