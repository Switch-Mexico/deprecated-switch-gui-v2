import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Chart from '../../../../../components/Dashboard/Inputs/ProjectInfo/ComposedChart';

const data = gql`
  query uploadPP {
    getProjectInfo
  }
`;

class ComposedChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.shape({
      Trainer: React.PropTypes.object,
    }).isRequired,
  };
  render() {
    console.log(this.props,"Chart")
    if (this.props.data.getProjectInfo && this.props.data.getProjectInfo[0]) {
      let data = this.props.data.getProjectInfo[0].data;
      data = data.filter(obj => obj.key == this.props.loadZoneID);
      return <Chart data={data}  />;
    }
    return (<div>Loading</div>);
  }
}

const ChartWithData = graphql(data)(ComposedChart);

export default ChartWithData;
