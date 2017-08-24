import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Router from '../../components/Router';

export default compose(
  graphql(gql`
    query getCurrentUser {
      me {
        _id
        name
      }
    }
  `),
  withProps(({ data: { me, loading } }) => ({
    loggedInUser: me || null,
    loading,
  }))
)(Router);
