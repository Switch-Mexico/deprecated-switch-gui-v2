import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import Capacity from '/imports/ui/containers/Dashboard/Inputs/capacityContainer';
import Pills from '/imports/ui/components/Navigation/Pills';
import { Switch, Route } from 'react-router-dom';

const Inputs = props =>
  <Col xs="12" sm="12" lg="12">
    <Row>
      <Pills />
    </Row>
    <Switch>
      <Route exact path="/" component={Capacity} />
      <Route exact path="/capacity" component={Capacity} />
    </Switch>
  </Col>;

export default Inputs;
