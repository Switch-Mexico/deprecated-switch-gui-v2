import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import reducers from '../reducers';
import client from '/imports/ui/apollo/ApolloClient';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import devToolsEnhancer from 'remote-redux-devtools';
import createHistory from 'history/createBrowserHistory';
import getInitialState from './initialState.js';
// create a redux store by providing reducers and middleware
// we also need to provide client.middleware() to let apollo/redux know about eachother.
// we use devToolsEnhancer which lets us add redux devtools at some point.

const history = createHistory();

const middlewares = [thunk, client.middleware(), routerMiddleware(history)];

const enhancers = [applyMiddleware(...middlewares)];

if (process.env.NODE_ENV === 'development') {
  enhancers.push(devToolsEnhancer({ suppressConnectErrors: false }));
}

const store = createStore(reducers, fromJS(getInitialState()), compose(...enhancers));

export default store;
