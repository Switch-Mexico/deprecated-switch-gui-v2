import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Chart from'./Chart';
import Chart2 from'./Chart2';
import Buttons from './Buttons';


const data = gql`
  query uploadPP {
    files
  }
`;

const Evolution = props =>
  <div
    style={{
      paddingBottom: `${10}px`,
      paddingTop: `${60}px`,
      width: `${100}%`,
      height: `${100}%`,
    }}
  >
    <Row style={{ height: `${100}%` }}>
      <Col xs="12" sm="12" lg="12" style={{ paddingLeft: `${0}px`, paddingRight: `${0}px` }}>
        <Card style={{ height: `${100}%`, width: `${100}%` }}>
          <Row style={{ height: `${50}%`, width: `${100}%`}}>
            <Col xs="6" sm="6" lg="6" style={{ paddingLeft: `${0}px` }}>
            </Col>
            <Col xs="6" sm="6" lg="6" style={{ paddingLeft: `${0}px` }}>
              <Row style={{ height: `${90}%`, width: `${100}%`}}>
                <Chart />
              </Row>
              <Row style={{ height: `${10}%`, width: `${100}%`}}>
                <div className="button-top">
                  <Buttons />
                </div>
              </Row>
            </Col>
          </Row>
          <Row style={{ height: `${50}%`, width: `${100}%`}}>
            <Col xs="6" sm="6" lg="6" style={{ paddingLeft: `${0}px` }}>

              <Chart2/>

              <div className="button-bottom">
              <Buttons />
              </div>
            </Col>
            <Col xs="6" sm="6" lg="6" style={{ paddingLeft: `${0}px` }}>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>;

const EvolutionWithData = graphql(data)(Evolution);

export default EvolutionWithData;
