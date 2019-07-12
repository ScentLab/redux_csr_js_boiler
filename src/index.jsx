import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import createStore from './store';
import * as serviceWorker from './serviceWorker';

export const reduxStore = createStore();
export const history = createBrowserHistory();

render(
  <Router>
    <Provider store={reduxStore} history={history}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

process.env.NODE_ENV === 'production'
  ? serviceWorker.register()
  : serviceWorker.unregister();
