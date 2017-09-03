import '/imports/ui/styles/App/HomeContainer.scss';
import { Col } from 'reactstrap';
import Capacity from '/imports/ui/containers/Dashboard/Inputs/Capacity/capacityContainer';
import LoadZones from '/imports/ui/containers/Dashboard/Inputs/loadZonesContainer';

import { Switch, Route } from 'react-router-dom';

const Inputs = () =>
  <Col xs="12" sm="12" lg="12" style={{ height: `${100}%` }}>
    <Switch>
      <Route exact path="/inputs" component={Capacity} />
      <Route path="/inputs/capacity" component={Capacity} />
      <Route path="/inputs/loadZones" component={LoadZones} />
    </Switch>
  </Col>;

export default Inputs;
