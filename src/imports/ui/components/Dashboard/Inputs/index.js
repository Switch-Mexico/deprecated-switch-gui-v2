import { Switch, Route } from 'react-router-dom';

import Capacity from '/imports/ui/containers/Dashboard/Inputs/capacityContainer';

const Dashboard = props =>
  <div id="outer-container">
    <main id="page-wrap">
      <Switch>
        <Route exact path="/capacity" component={Capacity} />
        <Route exact path="/loadzones" component={LoadZones} />
      </Switch>
    </main>
  </div>;

export default Dashboard;
