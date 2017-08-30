import { Switch, Route } from 'react-router-dom';

import '/imports/ui/styles/App/HomeContainer.scss';
import '/imports/ui/styles/Navigation/dropzone.scss';
import '/imports/ui/styles/Navigation/sidebar.scss';
import '/imports/ui/styles/Navigation/app.scss';
import '/imports/ui/styles/Navigation/dashboard.scss';
import 'bootstrap/dist/css/bootstrap.css';
import MainMenu from '/imports/ui/components/Navigation/Menu';

import Inputs from '/imports/ui/components/Dashboard/Inputs';

import Outputs from '/imports/ui/containers/Dashboard/Outputs/transmissionContainer';
import Information from '/imports/ui/containers/Dashboard/Information/Emissions/emissionsContainer';

const Home = props =>
  <div id="outer-container">
    <MainMenu {...props} />
    <main id="page-wrap">
      <Switch>
        <Route exact path="/" component={Information} />
        <Route exact path="/information" component={Information} />
        <Route path="/inputs" component={Inputs} />
        <Route exact path="/outputs" component={Outputs} />
      </Switch>
    </main>
  </div>;

export default Home;
