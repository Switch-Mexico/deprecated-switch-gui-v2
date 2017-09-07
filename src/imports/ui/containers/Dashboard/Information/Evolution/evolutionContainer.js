import { compose, withState, lifecycle } from 'recompose';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Evolution from '../../../../components/Dashboard/Information/Evolution';

const EvolutionContainer = compose(
  graphql(gql`
    query uploadPP {
      files
    }
  `)
)(Evolution);

export default EvolutionContainer;
