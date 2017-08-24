import immutable from 'immutable';
import initialState from './intlInitialState';
import { UPDATE } from 'react-intl-redux';
/** 
 * ## Global actions 
 */

const {
  SET_INTL_DATA,
  LOCALE_CONFIG_REQUEST,
  LOCALE_CONFIG_SUCCESS,
  LOCALE_CONFIG_FAILURE,
} = require('../actionsConstants').default;

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return state.merge(action.payload);
    case SET_INTL_DATA:
      return state.merge(immutable.fromJS(action.payload.data));
    case LOCALE_CONFIG_REQUEST:
      return state;
    case LOCALE_CONFIG_SUCCESS:
      return state;
    case LOCALE_CONFIG_FAILURE:
      return state;
    default:
      return state;
  }
}
