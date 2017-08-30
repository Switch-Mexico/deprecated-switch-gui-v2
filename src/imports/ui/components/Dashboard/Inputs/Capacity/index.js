import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import BarChart from '/imports/ui/components/Dashboard/Charts/BarChart';

const Capacity = props =>
  <div
    style={{ paddingBottom: `${10}px`, paddingTop: `${60}px`, width: `${100}%`, height: `${100}%` }}
  >
    <Row style={{ height: `${100}%` }}>
      <Col xs="8" sm="8" lg="8" style={{ paddingLeft: `${0}px` }}>
        <Card style={{ height: `${100}%`, width: `${100}%` }}>
          <CardHeader>Current Scenario of the Mexico's Installed Capacity </CardHeader>
          <CardBlock className="card-body">
            <div
              ref="national_map"
              className="chart-wrapper"
              style={{ height: `${100}%`, width: `${100}%` }}
            />
          </CardBlock>
        </Card>
      </Col>
      <Col xs="4" sm="4" lg="4">
        <Row style={{ height: `${32.3}%` }}>
          <Card
            style={{
              width: `${100}%`,
              height: `${100}%`,
            }}
          >
            <CardHeader>Country's Installed Capacity [MW]</CardHeader>
            <BarChart data={props.global} stacked={true} />
          </Card>
        </Row>
        <Row style={{ marginTop: `${10}px`, height: `${32.3}%` }}>
          <Card
            style={{
              height: `${100}%`,
              width: `${100}%`,
            }}
          >
            <CardHeader> Installed Capacity per Balancing Area [MW]</CardHeader>
            <BarChart data={props.balancingArea} color={props.color} />
          </Card>
        </Row>
        <Row style={{ marginTop: `${10}px`, height: `${32.3}%` }}>
          <Card
            style={{
              height: `${100}%`,
              width: `${100}%`,
            }}
          >
            <CardHeader>Installed Capacity per Load Zone [MW]</CardHeader>
            <BarChart data={props.loadZone} color={props.color} />
          </Card>
        </Row>
      </Col>
    </Row>
  </div>;

export default Capacity;
