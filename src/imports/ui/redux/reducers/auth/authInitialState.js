import { Record } from 'immutable';

const { SIGNIN } = require('../actionsConstants').default;
/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */

const Form = Record({
  state: SIGNIN,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    email: '',
    emailHasError: false,
    password: '',
    passwordHasError: false,
    passwordAgain: '',
    passwordAgainHasError: false,
    showPassword: false,
  }))(),
});

/**
 * ## InitialState
 * The form is set
 */
const InitialState = Record({
  form: new Form(),
});
export default InitialState;
