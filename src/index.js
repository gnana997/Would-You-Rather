import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './components/App';
import reducer from './reducers'
import middleware from './middleware'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(
  middleware
))

ReactDOM.render(
  <Router>
    <Provider store = {store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

