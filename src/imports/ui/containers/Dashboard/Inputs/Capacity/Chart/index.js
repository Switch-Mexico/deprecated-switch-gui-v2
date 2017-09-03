import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Chart from '../../../../../components/Dashboard/Inputs/Capacity/StackedChart';

const data = gql`
  query uploadPP {
    getPowerPlants
  }
`;

class StackedChart extends React.Component {
  static propTypes = {
    data: React.PropTypes.shape({
      Trainer: React.PropTypes.object,
    }).isRequired,
  };
  render() {
    if (this.props.data.getPowerPlants && this.props.data.getPowerPlants[0]) {
      return <Chart data={this.props.data.getPowerPlants[0].chartData} />;
    }

    return <div>Loading</div>;
  }
}

const ChartWithData = graphql(data)(StackedChart);

export default ChartWithData;
