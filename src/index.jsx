import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import { createBrowserHistory } from 'history';

import App from './App';
import createStore from './store';
import * as serviceWorker from './serviceWorker';

export const reduxStore = createStore()
export const history = createBrowserHistory()

render(
  <BrowserRouter>
    <Provider store={reduxStore} history={history}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()

