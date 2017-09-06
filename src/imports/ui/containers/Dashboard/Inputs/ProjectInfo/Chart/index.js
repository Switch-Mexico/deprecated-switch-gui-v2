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
    if (this.props.data.getPowerPlants && this.props.data.getPowerPlants[0]) {
      return <Chart data={this.props.data.getPowerPlants[0].chartData} />;
    }

    return <Chart  />;
  }
}

const ChartWithData = graphql(data)(ComposedChart);

export default ChartWithData;
