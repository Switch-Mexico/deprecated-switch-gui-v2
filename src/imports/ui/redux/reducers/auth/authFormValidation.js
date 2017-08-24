const { LOGOUT, SIGNUP, SIGNIN, FORGOT_PASSWORD } = require('../actionsConstants').default;

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation(state) {
  switch (state.form.state) {
    /**
     * ### Logout has no fields, so always valid
     */
    case LOGOUT:
      return state.setIn(['form', 'isValid'], false);
    /**
     * ### Registration has 4 fields
     */
    case SIGNUP:
      if (
        state.form.fields.username != '' &&
        state.form.fields.email !== '' &&
        state.form.fields.password !== '' &&
        state.form.fields.passwordAgain !== '' &&
        !state.form.fields.usernameHasError &&
        !state.form.fields.emailHasError &&
        !state.form.fields.passwordHasError &&
        !state.form.fields.passwordAgainHasError
      ) {
        return state.setIn(['form', 'isValid'], true);
      }
      return state.setIn(['form', 'isValid'], false);

    /**
     * ### Login has 2 fields
     */
    case SIGNIN:
      if (
        state.form.fields.email !== '' &&
        state.form.fields.password !== '' &&
        !state.form.fields.emailHasError &&
        !state.form.fields.passwordHasError
      ) {
        return state.setIn(['form', 'isValid'], true);
      }
      return state.setIn(['form', 'isValid'], false);

    /**
     * ### Reset password has 1 field
     */
    case FORGOT_PASSWORD:
      if (state.form.fields.email !== '' && !state.form.fields.emailHasError) {
        return state.setIn(['form', 'isValid'], true);
      }
      return state.setIn(['form', 'isValid'], false);

    default:
      return state;
  }
}
