import * as React from 'react';
import App from './app';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { addMiddleware } from './redux-dynamic-middlewares';
import { Provider } from 'react-redux';
import dynamicMiddlewares from './redux-dynamic-middlewares';
import { createStore, applyMiddleware } from 'redux';
import createReducer from './reducers';
import logger from 'redux-logger';

const history = createHistory();
const middleware = routerMiddleware(history);

addMiddleware(middleware);
addMiddleware(logger);

const store = createStore(createReducer(), applyMiddleware(dynamicMiddlewares));
(store as any).asyncReducers = {};

export const injectAsyncReducer = (name, asyncReducer) => {
  (store as any).asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer((store as any).asyncReducers));
};

export const Router: React.SFC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
