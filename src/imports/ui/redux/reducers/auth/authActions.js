import {
  loginWithPassword,
  logout as logoutUser,
  createUser,
  onTokenChange,
} from 'meteor-apollo-accounts';
import apolloClient from '/imports/ui/apollo/ApolloClient';

const {
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_FAILURE,
  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,
  LOGOUT,
  SIGNUP,
  SIGNIN,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FORGOT_PASSWORD,
} = require('../actionsConstants').default;

export function logoutState() {
  return {
    type: LOGOUT,
  };
}
export function signUpState() {
  return {
    type: SIGNUP,
  };
}

export function signInState() {
  return {
    type: SIGNIN,
  };
}
export function forgotPasswordState() {
  return {
    type: FORGOT_PASSWORD,
  };
}
/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
}
/**
 * ## Logout
 */
export function logout() {
  return (dispatch, getState) => {
    dispatch(logoutRequest());
    logoutUser(apolloClient)
      .then(() => {
        dispatch(logoutSuccess());
        dispatch(deleteSessionToken());
      })
      .catch(err => {
        dispatch(signInState());
        dispatch(logoutFailure(getAuthError(err, getState())));
      });
  };
}
/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: { field: field, value: value },
  };
}

/**
 * ## Signup actions
 */
export function signUpRequest() {
  return {
    type: SIGNUP_REQUEST,
  };
}
export function signUpSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}
export function signUpFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
}
/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
  return {
    type: SESSION_TOKEN_REQUEST,
  };
}
export function sessionTokenRequestSuccess() {
  return {
    type: SESSION_TOKEN_SUCCESS,
  };
}
export function sessionTokenRequestFailure() {
  return {
    type: SESSION_TOKEN_FAILURE,
  };
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: DELETE_TOKEN_REQUEST,
  };
}
export function deleteTokenRequestSuccess() {
  return {
    type: DELETE_TOKEN_SUCCESS,
  };
}

export function deleteSessionToken() {
  return dispatch => {
    dispatch(deleteTokenRequest());
    try {
      window.localStorage.setItem('Meteor.userId', null);
      window.localStorage.setItem('Meteor.loginToken', null);
      window.localStorage.setItem('Meteor.loginTokenExpires', null);
      dispatch(deleteTokenRequestSuccess());
    } catch (err) {
      console.log(err);
    }
  };
}
onTokenChange(() => {
  apolloClient.resetStore();
});
/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 **
 * Otherwise, dispatch the error so the user can see
 */
export function signUp(username, email, password) {
  return (dispatch, getState) => {
    dispatch(signUpRequest());
    createUser({ username, email, password }, apolloClient)
      .then(() => {
        dispatch(signUpSuccess());
        dispatch(logoutState());
      })
      .catch(err => {
        console.log(err);
        dispatch(signUpFailure(getAuthError(err, getState())));
      });
  };
}

/**
 * ## SIGNIN actions
 */
export function signInRequest() {
  return {
    type: SIGNIN_REQUEST,
  };
}

export function signInSuccess() {
  return {
    type: SIGNIN_SUCCESS,
  };
}

export function signInFailure(error) {
  return {
    type: SIGNIN_FAILURE,
    payload: error,
  };
}

export function signIn(email, password) {
  return dispatch => {
    dispatch(signInRequest());
    loginWithPassword({ email, password }, apolloClient)
      .then(() => {
        dispatch(signInSuccess());
        dispatch(logoutState());
      })
      .catch(err => {
        dispatch(signInFailure(getAuthError(err)));
      });
  };
}

function getAuthError(error) {
  const graphQLError = error.graphQLErrors && error.graphQLErrors[0];
  const message = graphQLError && graphQLError.message;
  if (message === 'User not found [403]') {
    return 'auth.error.emailError';
  } else if (message === 'Username already exists. [403]') {
    return 'auth.error.usernameExist';
  } else if (message === 'Email already exists. [403]') {
    return 'auth.error.emailExist';
  } else if (message === 'Incorrect password [403]') {
    return 'auth.error.passwordError';
  }
}
