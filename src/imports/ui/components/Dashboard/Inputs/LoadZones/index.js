import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Card, CardHeader, CardBlock } from 'reactstrap';

import BarChart from './BarChart';

const LoadZones = props =>
  <div style={{ marginTop: `${60}px`, width: `${100}%`, height: `${100}%` }}>
    <Row style={{ height: `${50}%` }}>
      <Card style={{ marginBottom: `${10}px` }}>
        <CardHeader>Current Scenario of the Mexico's Installed Capacity </CardHeader>
        <CardBlock className="card-body">
          <div
            ref="national_map"
            className="chart-wrapper"
            style={{ height: `${100}%`, width: `${100}%` }}
          />
        </CardBlock>
      </Card>
    </Row>
    <Row style={{ height: `${45}%` }}>
      <Card style={{ marginBottom: `${20}px`, width: `${100}%` }}>
        <CardHeader>Installed Capacity per Load Zone [MW]</CardHeader>
        <BarChart data={props.loadZone} color={props.color} />
      </Card>
    </Row>
  </div>;

export default LoadZones;
