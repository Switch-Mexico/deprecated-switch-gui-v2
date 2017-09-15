import { Col } from 'reactstrap';
import Evolution from '/imports/ui/containers/Dashboard/Information/Evolution/evolutionContainer';
import Generation from '/imports/ui/containers/Dashboard/Information/Evolution/generationContainer';

import { Switch, Route, Redirect } from 'react-router-dom';

const InformationRouter = () =>
  <Col xs="12" sm="12" lg="12" style={{ height: `${100}%` }}>
    <Switch>
      <Route exact path="/information" component={Evolution} />
      <Route path="/information/evolution" component={Evolution} />
      <Route path="/information/generation" component={Generation} />
      <Route render={() => <Redirect to="/information" />} />
    </Switch>
  </Col>;

export default InformationRouter;
