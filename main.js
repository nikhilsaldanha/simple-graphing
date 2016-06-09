import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App.js';
import configureStore from './store/store.config.js';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}><App id='file-upload' /></Provider>,
  document.getElementById('app')
);