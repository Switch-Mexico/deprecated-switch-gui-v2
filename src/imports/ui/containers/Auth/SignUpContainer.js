import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Map } from 'immutable';
import FormRenderContainer from './FormRenderContainer';
// Actions
import * as authActions from '../../redux/reducers/auth/authActions';
import * as intlActions from '../../redux/reducers/intl/intlActions';

const actions = [authActions, intlActions];

const {
  SIGNIN,
  SIGNUP,
  FORGOT_PASSWORD,
} = require('../../redux/reducers/actionsConstants').default;

function mapStateToProps(state) {
  return {
    auth: state.toJS().auth,
    intlState: state.toJS().intl,
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map().merge(...actions).filter(value => typeof value === 'function').toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  };
}

function buttonPressHandler(authCall, username, email, password) {
  authCall(username, email, password);
}

class SignUpContainer extends React.Component {
  render() {
    let signUpButtonText = this.props.intl.formatMessage({ id: 'auth.signUp.title' });
    let onButtonPress = buttonPressHandler.bind(
      null,
      this.props.actions.signUp,
      this.props.auth.form.fields.username,
      this.props.auth.form.fields.email,
      this.props.auth.form.fields.password
    );

    return (
      <FormRenderContainer
        formType={SIGNUP}
        loginButtonText={signUpButtonText}
        onButtonPress={onButtonPress}
        displayPasswordCheckbox
        leftLinkType={SIGNIN}
        rightLinkType={FORGOT_PASSWORD}
        auth={this.props.auth}
        intlState={this.props.intlState}
        intl={this.props.intl}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SignUpContainer));
