import { compose, withState, lifecycle } from 'recompose';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Generation from '../../../../components/Dashboard/Information/Evolution/Generation';

const GenerationContainer = compose(
  graphql(gql`
    query uploadPP {
      files
    }
  `)
)(Generation);

export default GenerationContainer;
