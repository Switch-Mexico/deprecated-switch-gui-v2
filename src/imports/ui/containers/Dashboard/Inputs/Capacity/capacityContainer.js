import { compose, withState, lifecycle } from 'recompose';
import '/imports/ui/styles/App/HomeContainer.scss';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Capacity from '../../../../components/Dashboard/Inputs/Capacity';

const CapacityContainer = compose(
  graphql(gql`
    query uploadPP {
      getPowerPlants
    }
  `),
  withState('loadZone', 'setLoadZone', []),
  withState('color', 'setColor', '#343434'),
  withState('balancingArea', 'setBalancingArea', []),
  withState('countryData', 'setCountryData', {})
)(Capacity);

export default CapacityContainer;
