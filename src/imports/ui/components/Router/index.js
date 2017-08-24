import { Switch, Route, Redirect } from 'react-router-dom';

import HomeContainer from '../../containers/Home/homeContainer';

/* Containers */
import SignInContainer from '../../containers/Auth/SignInContainer';
import SignUpContainer from '../../containers/Auth/SignUpContainer';
import ForgotPasswordContainer from '../../containers/Auth/ForgotPasswordContainer';

const Router = ({ loggedInUser, loading }) =>
  true
    ? // private routes
      <Switch>
        <Route path="/" component={HomeContainer} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    : !loading
      ? // public routes
        <Switch>
          <Route exact path="/" component={SignInContainer} />
          <Route path="/signup" component={SignUpContainer} />
          <Route path="/forgot-password" component={ForgotPasswordContainer} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      : null;

export default Router;
