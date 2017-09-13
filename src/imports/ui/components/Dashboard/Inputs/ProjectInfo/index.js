import { Row, Card, CardHeader, CardBlock, Col } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BarChart from '../../../../containers/Dashboard/Inputs/ProjectInfo//Chart';
import Map from '../../../../containers/Dashboard/Inputs/ProjectInfo/Map';

const data = gql`
query uploadPP {
  getProjectInfo
}
`;

const ProjectInfo = props => {
  console.log(props,"index")
  return (
  <div style={{ marginTop: `${60}px`, width: `${100}%`, height: `${100}%` }}>
    <Row style={{ height: `${50}%` }}>
      <Col xs="9" sm="9" lg="9" style={{ paddingLeft: `${0}px`, height: `${100}%` }}>
        <Card style={{ height: `${100}%`, width: `${100}%` }}>
          <CardHeader>Mexico electricity load zones</CardHeader>
            <Map setLoadZoneID={props.setLoadZoneID}/>
        </Card>
      </Col>
      <Col xs="3" sm="3" lg="3" style={{ paddingLeft: `${0}px`, height: `${100}%`, paddingRight: `${0}px` }}>
        <Row style={{ height: `${33}%`, paddingLeft: `${15}px`, paddingRight: `${15}px` }}>
           <Card style={{ marginBottom: `${10}px`, height: `${100}%`, width: `${100}%`, background:'##f8f9f9'  }}>  
            <div className='card-details' >
            <div className='card-big-details'><span>{props.loadZoneName}</span></div>
            <div className='card-small-details'>Load zone name</div>
            </div>
          </Card>
        </Row>
        <Row style={{ height: `${33}%`, paddingLeft: `${15}px`, paddingRight: `${15}px`,paddingTop: `${10}px` }}>
          <Card style={{ marginBottom: `${10}px`, height: `${100}%`, width: `${100}%`, background:'##f8f9f9'  }}>
            <div className='card-details' >
              <div className='card-big-details'><span>{props.loadZoneID}</span></div>
              <div className='card-small-details'>Load zone ID</div>
            </div>
          </Card>
        </Row>
        <Row style={{ height: `${33}%`, paddingLeft: `${15}px`, paddingRight: `${15}px`,paddingTop: `${10}px` }}>
          <Card style={{ marginBottom: `${10}px`, height: `${100}%`, width: `${100}%`, background:'##f8f9f9'   }}>
            <div className='card-details' >
              <div className='card-big-details'><span>{props.totalCapacity}</span></div>
              <div className='card-small-details'>Total capacity limit [MW]</div>
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
    <Row style={{ height: `${45}%` }}>
      <Card style={{marginTop: `${20}px`, marginBottom: `${20}px`, width: `${100}%` }}>
        <CardHeader>Capacity limit for each project </CardHeader>
        <BarChart loadZoneID={props.loadZoneID} setLoadZoneName={props.setLoadZoneName} setTotalCapacity={props.setTotalCapacity} />
      </Card>
    </Row>
  </div>)};

const ProjectInfoWithData = graphql(data)(ProjectInfo);

export default ProjectInfoWithData;

