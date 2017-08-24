import AuthInitialState from './../reducers/auth/authInitialState';
import IntlInitialState from './../reducers/intl/intlInitialState';

export default function getInitialState() {
  const _initState = {
    intl: IntlInitialState,
    auth: new AuthInitialState(),
  };
  return _initState;
}
