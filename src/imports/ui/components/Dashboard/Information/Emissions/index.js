import React from 'react';
import BarChart from '../../Charts/NeeliChart';
import { Row, Col, Card, CardHeader } from 'reactstrap';

const Emissions = props => {
  console.log('');

  return (
    <Row>
      <Col xs="12" sm="12" lg="12">
        <Card
          style={{
            marginTop: `${60}px`,
            height: `${420}px`,
            marginLeft: `${15}px`,
            width: `${690}px`,
          }}
        >
          <CardHeader>Chart showing something</CardHeader>
          <BarChart />
        </Card>
      </Col>
    </Row>
  );
};

export default Emissions;
