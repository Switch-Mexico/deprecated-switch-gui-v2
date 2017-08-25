import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';

import { showNewPoints } from '../../../../containers/Dashboard/Outputs/mapHelpers';

const Capacity = props => {
  if (props.blueLines != 0) {
    showNewPoints(props, props.country, props.map, props.datas, props.period, props.blueLines);
  }
  return (
    <Row>
      <Col xs="8" sm="8" lg="8">
        <Card style={{ marginTop: `${60}px`, marginLeft: `${15}px`, width: `${750}px` }}>
          <CardHeader>Mexico's Transmission Lines </CardHeader>
          <CardBlock className="card-body">
            <div
              ref="national_map"
              className="chart-wrapper"
              style={{ height: `${620}px`, width: `${100}%` }}
            />
          </CardBlock>
        </Card>
      </Col>
      <Col xs="4" sm="4" lg="4">
        <Row>
          <Card
            style={{
              marginTop: `${60}px`,
              height: `${252}px`,
              width: `${400}px`,
            }}
          >
            <CardHeader>Country's Installed Capacity [MW]</CardHeader>
          </Card>
        </Row>
        <Row>
          <Card
            style={{
              marginTop: `${10}px`,
              width: `${400}px`,
              height: `${220}px`,
            }}
          >
            <CardHeader> Installed Capacity per Balancing Area [MW]</CardHeader>
          </Card>
        </Row>
        <Row>
          <Card
            style={{
              marginTop: `${10}px`,
              height: `${220}px`,
              width: `${400}px`,
            }}
          >
            <CardHeader>Installed Capacity per Load Zone [MW]</CardHeader>
          </Card>
        </Row>
      </Col>
    </Row>
  );
};

export default Capacity;
