import '/imports/ui/styles/App/HomeContainer.scss';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
      <Col xs="12" sm="12" lg="12" style={{ paddingLeft: `${0}px` }}>
        <Card style={{ height: `${100}%`, width: `${100}%` }}>
          <CardHeader> Evolution </CardHeader>
          <CardBlock className="card-body">
            <div>Evolution Page</div>
          </CardBlock>
        </Card>
      </Col>
    </Row>
  </div>;

const EvolutionWithData = graphql(data)(Evolution);

export default EvolutionWithData;
