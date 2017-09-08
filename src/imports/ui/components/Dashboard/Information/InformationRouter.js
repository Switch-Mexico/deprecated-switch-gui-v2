import { Col } from 'reactstrap';
import Evolution from '/imports/ui/containers/Dashboard/Information/Evolution/evolutionContainer';

import { Switch, Route } from 'react-router-dom';

const InformationRouter = () =>
  <Col xs="12" sm="12" lg="12" style={{ height: `${100}%` }}>
    <Switch>
      <Route path="/information" component={Evolution} />
      <Route path="/information/evolution" component={Evolution} />
    </Switch>
  </Col>;

export default InformationRouter;
