import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

const {
  SIGNUP,
  SIGNIN,
  FORGOT_PASSWORD,
} = require('../../../redux/reducers/actionsConstants').default;

let InputText = styled.input.attrs({
  type: props => (props.type ? props.type : 'text'),
  placeholder: props => props.placeholder,
  maxLength: props => props.maxLength,
  disabled: props => props.disabled,
  onChange: props => props.onChange,
  value: props => props.value,
})`
  color: palevioletred;
	font-size: 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

let InputTitle = styled.h2`
  color: white;
  font-size: 1em;
`;

let InputError = styled.h2`
  color: tomato;
  font-size: 1em;
`;

class AuthForm extends React.Component {
  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {
    let { formType, intl, form, onChange, values } = this.props;
    let username = {
      type: 'text',
      value: values.username,
      label: intl.formatMessage({ id: 'auth.form.username' }),
      placeholder: intl.formatMessage({ id: 'auth.form.username' }).toLowerCase(),
      error: intl.formatMessage({ id: 'auth.form.error.username' }),
      maxLength: 12,
      disabled: form.isFetching,
      hasError: form.fields.usernameHasError,
    };

    let email = {
      type: 'email',
      value: values.email,
      label: intl.formatMessage({ id: 'auth.form.email' }),
      placeholder: intl.formatMessage({ id: 'auth.form.email' }).toLowerCase(),
      error: intl.formatMessage({ id: 'auth.form.error.email' }),
      disabled: form.isFetching,
      hasError: form.fields.emailHasError,
    };

    let secureTextEntry = !form.fields.showPassword;

    let password = {
      type: 'password',
      value: values.password,
      label: intl.formatMessage({ id: 'auth.form.password' }),
      placeholder: intl.formatMessage({ id: 'auth.form.password' }).toLowerCase(),
      error: intl.formatMessage({ id: 'auth.form.error.password' }),
      disabled: form.isFetching,
      hasError: form.fields.passwordHasError,
    };

    let passwordAgain = {
      type: 'password',
      value: values.passwordAgain,
      label: intl.formatMessage({ id: 'auth.form.passwordAgain' }),
      placeholder: intl.formatMessage({ id: 'auth.form.passwordAgain' }).toLowerCase(),
      error: intl.formatMessage({ id: 'auth.form.error.passwordAgain' }),
      maxLength: 12,
      disabled: form.isFetching,
      hasError: form.fields.passwordAgainHasError,
    };

    let loginForm;

    switch (formType) {
      /**
       * ### Registration
       * The registration form has 4 fields
       */
      case SIGNUP:
        loginForm = (
          <div>
            <InputTitle>
              {username.label}
            </InputTitle>
            <input
              type="text"
              placeholder={username.placeholder}
              value={username.value}
              maxLength={username.maxLength}
              disabled={username.disabled}
              onChange={event => {
                onChange({ username: event.target.value });
              }}
            />
            {username.hasError
              ? <InputError>
                  {username.error}
                </InputError>
              : null}
            <InputTitle>
              {email.label}
            </InputTitle>
            <input
              type="email"
              placeholder={email.placeholder}
              value={email.value}
              maxLength={email.maxLength}
              disabled={email.disabled}
              onChange={event => {
                onChange({ email: event.target.value });
              }}
            />
            {email.hasError
              ? <InputError>
                  {email.error}
                </InputError>
              : null}
            {secureTextEntry
              ? <div>
                  <InputTitle>
                    {password.label}
                  </InputTitle>
                  <input
                    type="password"
                    placeholder={password.placeholder}
                    value={password.value}
                    maxLength={password.maxLength}
                    disabled={password.disabled}
                    onChange={event => {
                      onChange({ password: event.target.value });
                    }}
                  />
                  {password.hasError
                    ? <InputError>
                        {password.error}
                      </InputError>
                    : null}
                  <InputTitle>
                    {passwordAgain.label}
                  </InputTitle>
                  <input
                    type="password"
                    placeholder={passwordAgain.placeholder}
                    value={passwordAgain.value}
                    maxLength={passwordAgain.maxLength}
                    disabled={passwordAgain.disabled}
                    onChange={event => {
                      onChange({ passwordAgain: event.target.value });
                    }}
                  />
                  {passwordAgain.hasError
                    ? <InputError>
                        {passwordAgain.error}
                      </InputError>
                    : null}
                </div>
              : <div>
                  <InputTitle>
                    {password.label}
                  </InputTitle>
                  <input
                    type="text"
                    placeholder={password.placeholder}
                    value={password.value}
                    maxLength={password.maxLength}
                    disabled={password.disabled}
                    onChange={event => {
                      onChange({ password: event.target.value });
                    }}
                  />
                  {password.hasError
                    ? <InputError>
                        {password.error}
                      </InputError>
                    : null}
                  <InputTitle>
                    {passwordAgain.label}
                  </InputTitle>
                  <input
                    type="text"
                    placeholder={passwordAgain.placeholder}
                    value={passwordAgain.value}
                    maxLength={passwordAgain.maxLength}
                    disabled={passwordAgain.disabled}
                    onChange={event => {
                      onChange({ passwordAgain: event.target.value });
                    }}
                  />
                  {passwordAgain.hasError
                    ? <InputError>
                        {passwordAgain.error}
                      </InputError>
                    : null}
                </div>}
          </div>
        );
        break;
      /**
       * ### Login
       * The login form has only 2 fields
       */
      case SIGNIN:
        loginForm = (
          <div>
            <InputTitle>
              {email.label}
            </InputTitle>
            <input
              type="email"
              placeholder={email.placeholder}
              value={email.value}
              maxLength={email.maxLength}
              disabled={email.disabled}
              onChange={event => {
                onChange({ email: event.target.value });
              }}
            />
            {email.hasError
              ? <InputError>
                  {email.error}
                </InputError>
              : null}
            <InputTitle>
              {password.label}
            </InputTitle>
            <input
              type="password"
              placeholder={password.placeholder}
              value={password.value}
              maxLength={password.maxLength}
              disabled={password.disabled}
              onChange={event => {
                onChange({ password: event.target.value });
              }}
            />
            {password.hasError
              ? <InputError>
                  {password.error}
                </InputError>
              : null}
          </div>
        );
        break;
      /**
       * ### Reset password
       * The password reset form has only 1 field
       */
      case FORGOT_PASSWORD:
        loginForm = (
          <div>
            <InputTitle>
              {email.label}
            </InputTitle>
            <input
              type="email"
              placeholder={email.placeholder}
              value={email.value}
              maxLength={email.maxLength}
              disabled={email.disabled}
              onChange={event => {
                onChange({ email: event.target.value });
              }}
            />
            {email.hasError
              ? <InputError>
                  {email.error}
                </InputError>
              : null}
          </div>
        );
        break;AuthForm
      default:
        break;
    }
    /**
     * ### Return
     * returns the Form with the correct structures
     */
    return (
      <div>
        {loginForm}
        <br />
      </div>
    );
  }
}

export default injectIntl(AuthForm);
