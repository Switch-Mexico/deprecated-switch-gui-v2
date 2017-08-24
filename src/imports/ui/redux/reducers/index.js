import { combineReducers } from 'redux-immutable';
import routerReducer from './route';
// Apollo
import client from '/imports/ui/apollo/ApolloClient';

// Reducers
import intlReducer from './intl/intlReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  intl: intlReducer,
  apollo: client.reducer(),
  routing: routerReducer,
  auth: authReducer,
});

export default rootReducer;
