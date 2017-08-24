import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import BarChart from '/imports/ui/components/Dashboard/Charts/BarChart';

const Capacity = props =>
  <Row>
    <Col xs="8" sm="8" lg="8">
      <Card style={{ marginTop: `${60}px`, marginLeft: `${15}px`, width: `${750}px` }}>
        <CardHeader>Current Scenario of the Mexico's Installed Capacity </CardHeader>
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
          <BarChart data={props.global} stacked={true} />
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
          <BarChart data={props.balancingArea} color={props.color} />
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
          <BarChart data={props.loadZone} color={props.color} />
        </Card>
      </Row>
    </Col>
  </Row>;

export default Capacity;
