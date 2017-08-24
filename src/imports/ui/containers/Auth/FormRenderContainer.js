import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Map } from 'immutable';
// Components
import Checkbox from '../../components/commons/CheckBox/';
import AuthButton from '../../components/Auth/AuthButton';
import AuthForm from '../../components/Auth/forms/AuthForm';
import SelectLanguage from '../../components/Intl/SelectLanguage';
// Actions
import * as authActions from '../../redux/reducers/auth/authActions';
import * as intlActions from '../../redux/reducers/intl/intlActions';

const actions = [authActions, intlActions];
const {
  SIGNIN,
  SIGNUP,
  FORGOT_PASSWORD,
} = require('../../redux/reducers/actionsConstants').default;

function mapDispatchToProps(dispatch) {
  const creators = Map().merge(...actions).filter(value => typeof value === 'function').toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  };
}

class FormRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        username: this.props.auth.form.fields.username,
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain,
      },
    };
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      values: {
        username: nextprops.auth.form.fields.username,
        email: nextprops.auth.form.fields.email,
        password: nextprops.auth.form.fields.password,
        passwordAgain: nextprops.auth.form.fields.passwordAgain,
      },
    });
  }
  onChange = values => {
    let newValues = Object.assign({}, this.state.values);

    if (values.username || values.username === '') {
      this.props.actions.onAuthFormFieldChange('username', values.username);
      newValues.username = values.username;
    }
    if (values.email || values.email === '') {
      this.props.actions.onAuthFormFieldChange('email', values.email);
      newValues.email = values.email;
    }
    if (values.password || values.password === '') {
      this.props.actions.onAuthFormFieldChange('password', values.password);
      this.props.actions.onAuthFormFieldChange('passwordAgain', this.state.values.passwordAgain);
      newValues.password = values.password;
    }
    if (values.passwordAgain || values.passwordAgain === '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain', values.passwordAgain);
      this.props.actions.onAuthFormFieldChange('password', this.state.values.password);
      newValues.passwordAgain = values.passwordAgain;
    }

    this.setState({ values: newValues });
  };
  getLink = (linkType, actionsAuth) => {
    let signIn = (
      <button
        onClick={() => {
          actionsAuth.signInState();
          this.props.history.push('/signIn');
        }}
      >
        <FormattedMessage id="auth.button.signIn.title" />
      </button>
    );
    let signUp = (
      <button
        onClick={() => {
          actionsAuth.signUpState();
          this.props.history.push('/signUp');
        }}
      >
        <FormattedMessage id="auth.button.signUp.title" />
      </button>
    );
    let forgotPassword = (
      <button
        onClick={() => {
          actionsAuth.forgotPasswordState();
          this.props.history.push('/forgot-password');
        }}
      >
        <FormattedMessage id="auth.button.forgotPassword.title" />
      </button>
    );
    switch (linkType) {
      case FORGOT_PASSWORD:
        return forgotPassword;
      case SIGNIN:
        return signIn;
      case SIGNUP:
        return signUp;
      default:
        break;
    }
  };

  render() {
    let {
      formType,
      loginButtonText,
      onButtonPress,
      displayPasswordCheckbox,
      leftLinkType,
      rightLinkType,
    } = this.props;

    let passwordCheckbox = <div />;
    let leftLink = this.getLink(leftLinkType, this.props.actions);
    let rightLink = this.getLink(rightLinkType, this.props.actions);
    if (displayPasswordCheckbox) {
      passwordCheckbox = (
        <div>
          <Checkbox
            value={this.props.auth.form.fields.showPassword}
            disabled={this.props.auth.form.isFetching}
            isChecked={() => {
              this.props.actions.onAuthFormFieldChange('showPassword', true);
            }}
            noChecked={() => {
              this.props.actions.onAuthFormFieldChange('showPassword', false);
            }}
          />
          <h4>
            <FormattedMessage id="auth.form.showPasswords" />
          </h4>
        </div>
      );
    }
    return (
      <div>
        <div>
          <AuthForm
            formType={formType}
            form={this.props.auth.form}
            onChange={this.onChange}
            values={this.state.values}
          />
          {passwordCheckbox}
        </div>
        <AuthButton
          isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
          onClick={onButtonPress}
          buttonText={loginButtonText}
        />
        <br />
        <div>
          {rightLink}
          {leftLink}
        </div>
        <br />
        {this.props.auth.form.error
          ? <h3>
              <FormattedMessage id={this.props.auth.form.error} />
            </h3>
          : null}
        <br />
        <SelectLanguage
          actions={this.props.actions}
          intlState={this.props.intlState}
          intl={this.props.intl}
        />
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(withRouter(FormRender));
