import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
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

          <Col xs="6" sm="6" lg="6" style={{ paddingLeft: `${0}px`, paddingRight: `${0}px` }}>
          <Card style={{ height: `${100}%`, width: `${100}%`, paddingRight: `${0}px`  }}>

            <Row style={{ height: `${40}%`, marginLeft: `${15}px`,  width: `${100}%`}}>
              <div className="text-charts">
                <CardTitle>Total Available Capacity By Type of <br/> Technology in 2021 and 2030</CardTitle>
                <CardText>In 2030, the total capacity will be 109,367 MW, which is a 61% increase from the end of 2015. Half of the installed capacity will be made up of conventional technologies and the other half will be comprised of clean technologies.  </CardText>
              </div>
            </Row>
            <Row style={{ height: `${60}%`, width: `${100}%`, marginRight: `${0}px`, marginLeft: `${15}px`, }}>
              <Row style={{ height: `${80}%`, width: `${100}%`, marginRight: `${0}px`,}}>
                <Chart2 />
              </Row>
              <Row style={{ height: `${20}%`, width: `${100}%`}}>
                <div className="button-top">
                  <Buttons />
                </div>
              </Row>
            </Row>
            </Card>
          </Col>
          

          <Col xs="6" sm="6" lg="6" style={{ paddingLeft: `${0}px`, paddingRight: `${0}px` }}>
            <Card style={{ height: `${100}%`, width: `${100}%` }}>
            
            <Row style={{ height: `${60}%`, width: `${100}%`}}>
              <div className='custom-chart'>
                <Chart/>
                <div className="button-bottom">
                  <Buttons />
                </div>
              </div>
            </Row>
            <Row style={{ height: `${40}%`, width: `${100}%`}}>
              <div className="text-charts">
                <CardTitle>Total Generation by Type of Technology  <br/>in 2021 and 2030</CardTitle>
                <CardText>In 2030, the estimated electric generation will be 443,606 GWh, where 59% will be generation of conventional energies and the other 41% will be generation of clean energies. </CardText>
              </div>
            </Row>
            </Card>
          </Col>
       

    </Row>
  </div>;

const EvolutionWithData = graphql(data)(Evolution);

export default EvolutionWithData;
