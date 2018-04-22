import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

const app = document.getElementById('app');

render(
  <Provider store={ store }>
    <App />
  </Provider>, app
);

