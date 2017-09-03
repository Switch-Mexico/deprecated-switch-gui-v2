import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import BarChart from './BarChart';
import Map from '../../../../containers/Dashboard/Inputs/Capacity/Map';
import StackedChart from '../../../../containers/Dashboard/Inputs/Capacity/Chart';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const data = gql`
  query uploadPP {
    getPowerPlants
  }
`;

const Capacity = props =>
  <div
    style={{
      paddingBottom: `${10}px`,
      paddingTop: `${60}px`,
      width: `${100}%`,
      height: `${100}%`,
    }}
  >
    <Row style={{ height: `${100}%` }}>
      <Col xs="8" sm="8" lg="8" style={{ paddingLeft: `${0}px` }}>
        <Card style={{ height: `${100}%`, width: `${100}%` }}>
          <CardHeader>Current Scenario of the Mexico's Installed Capacity </CardHeader>
          <CardBlock className="card-body">
            <Map
              setLoadZone={props.setLoadZone}
              setBalancingArea={props.setBalancingArea}
              setColor={props.setColor}
              setCountryData={props.setCountryData}
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
            <StackedChart />
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
            <BarChart data={props.balancingArea} color={props.balancingArea.color} />
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
            <BarChart data={props.loadZone} color={props.balancingArea.color} />
          </Card>
        </Row>
      </Col>
    </Row>
  </div>;

const CapacityWithData = graphql(data)(Capacity);

export default CapacityWithData;
