import '/imports/ui/styles/App/HomeContainer.scss';
import { Col } from 'reactstrap';
import Capacity from '/imports/ui/containers/Dashboard/Inputs/capacityContainer';
import Emissions from '/imports/ui/components/Dashboard/Information/Emissions';

import { Switch, Route } from 'react-router-dom';

const Inputs = () =>
  <Col xs="12" sm="12" lg="12">
    <Switch>
      <Route exact path="/inputs" component={Capacity} />
      <Route path="/inputs/capacity" component={Emissions} />
    </Switch>
  </Col>;

export default Inputs;
