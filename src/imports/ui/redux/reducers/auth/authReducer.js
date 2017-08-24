import InitialState from './authInitialState';
import authFormValidation from './authFormValidation';
import authFieldValidations from './authFieldValidations';
/**
 * ## Auth actions
 */
const {
  ON_AUTH_FORM_FIELD_CHANGE,
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,
  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,
  DELETE_TOKEN_FAILURE,
  SIGNIN,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FORGOT_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} = require('../actionsConstants').default;

const initialState = new InitialState();
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case SESSION_TOKEN_REQUEST:
    case SIGNUP_REQUEST:
    case LOGOUT_REQUEST:
    case SIGNIN_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return state.setIn(['form', 'isFetching'], true).setIn(['form', 'error'], null);

    /**
     * ### Logout state
     * The user has successfully 
     * Clear the form's error and all the fields
     */
    case LOGOUT:
      console.log('logoutReducer');
      return authFormValidation(
        state
          .setIn(['form', 'state'], action.type)
          .setIn(['form', 'error'], null)
          .setIn(['form', 'fields', 'username'], '')
          .setIn(['form', 'fields', 'usernameHasError'], false)
          .setIn(['form', 'fields', 'email'], '')
          .setIn(['form', 'fields', 'emailHasError'], false)
          .setIn(['form', 'fields', 'password'], '')
          .setIn(['form', 'fields', 'passwordHasError'], false)
          .setIn(['form', 'fields', 'passwordAgain'], '')
          .setIn(['form', 'fields', 'passwordAgainHasError'], false)
      );
    /**
     * ### Loggin in state
     * The user isn't logged in, and needs to
     * signin, signup or reset password
     *
     * Set the form state and clear any errors
     */
    case SIGNIN:
    case SIGNUP:
    case FORGOT_PASSWORD:
      return authFormValidation(
        state
          .setIn(['form', 'state'], action.type)
          .setIn(['form', 'error'], null)
          .setIn(['form', 'fields', 'username'], '')
          .setIn(['form', 'fields', 'usernameHasError'], false)
          .setIn(['form', 'fields', 'email'], '')
          .setIn(['form', 'fields', 'emailHasError'], false)
          .setIn(['form', 'fields', 'password'], '')
          .setIn(['form', 'fields', 'passwordHasError'], false)
          .setIn(['form', 'fields', 'passwordAgain'], '')
          .setIn(['form', 'fields', 'passwordAgainHasError'], false)
      );

    /**
     * ### Auth form field change
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidation
     */

    case ON_AUTH_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;
      let nextState = state.setIn(['form', 'fields', field], value).setIn(['form', 'error'], null);

      return authFormValidation(authFieldValidations(nextState, action), action);
    }
    /**
   * ### Requests end, good or bad
   * Set the fetching flag so the forms will be enabled
   */
    case SESSION_TOKEN_SUCCESS:
    case SESSION_TOKEN_FAILURE:
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return state.setIn(['form', 'isFetching'], false);
    /**
   * ### Access to Parse.com denied or failed
   * The fetching is done, but save the error
   * for display to the user
   */
    case SIGNUP_FAILURE:
    case LOGOUT_FAILURE:
    case SIGNIN_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return state.setIn(['form', 'isFetching'], false).setIn(['form', 'error'], action.payload);

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
    case DELETE_TOKEN_FAILURE:
      /**
         * no state change, just an ability to track action requests...
         */
      return state;
    /*
    * ## Default
   */
    default:
      return state;
  }
}
