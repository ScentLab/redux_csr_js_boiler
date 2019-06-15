import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware, compose} from 'redux';

import apiMiddleware from './middlewares/apiMiddleware';
import rootReducer from '../modules';

export default (initialState = { auth : { isAuthenticated : window.localStorage.getItem('accessToken')}}) => {
  const isProd = process.env.NODE_ENV === 'production';
  const storeCompose = isProd ? compose() : composeWithDevTools({serialize: true, trace: true});

  return createStore(rootReducer, initialState, storeCompose(
    applyMiddleware(ReduxPromise),
    applyMiddleware(ReduxThunk),
    applyMiddleware(apiMiddleware),
    )
  );
}
