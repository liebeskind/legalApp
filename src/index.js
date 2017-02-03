import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import App from './containers/App'
import reducers from './reducers'

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

// import injectTapEventPlugin from "react-tap-event-plugin";
// injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk, ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container')
);