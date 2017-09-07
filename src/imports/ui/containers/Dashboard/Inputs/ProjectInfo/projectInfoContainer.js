import { compose, withState, lifecycle } from 'recompose';
import '/imports/ui/styles/App/HomeContainer.scss';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ProjectInfo from '../../../../components/Dashboard/Inputs/ProjectInfo';

const ProjectInfoContainer = compose(
  graphql(gql`
    query uploadPI {
      getProjectInfo
    }
  `),
  withState('loadZoneID', 'setLoadZoneID', '00'),
)(ProjectInfo);

export default ProjectInfoContainer;
