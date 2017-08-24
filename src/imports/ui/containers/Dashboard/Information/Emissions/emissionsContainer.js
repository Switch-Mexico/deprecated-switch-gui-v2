import Emissions from '/imports/ui/components/Dashboard/Information/Emissions/index';
import { compose, withState, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QueryContainer = compose(
  graphql(gql`
    query fileQuery {
      files
    }
  `),
  withState('map', 'setMap', 0),
  lifecycle({
    componentWillMount() {},
    componentDidMount() {
      this.props.data.refetch().then(res => {
        let data = res.data.files; // fetch files collection

        // FIXME this approach is temporal
        data = data.filter(obj => {
          if (obj[0]) {
            let ob = obj[0];
            return ob.name == 'neeli';
          }
        })[0];
        data = data[0];
        // End of FIXME
      });
    },
  })
)(Emissions);

export default QueryContainer;
