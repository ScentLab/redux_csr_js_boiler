import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import rootReducer from '../modules';

const storeCompose = process.env.NODE_ENV === 'production' ? compose() : composeWithDevTools({
  serialize: true,
  trace: true
});

export default (initialState = {}) =>
createStore(
  rootReducer,
  initialState,
  storeCompose(applyMiddleware(ReduxPromise, ReduxThunk))
);
