import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

let componentConfig = {
  iconFiletypes: ['.csv', '.tab', '.xlsx'],
  showFiletypeIcon: true,
  postUrl: 'no-url',
};

var djsConfig = {
  acceptedFiles: '.csv,.tab,.xlsx,.xls',
  autoProcessQueue: false,
  showFiletypeIcon: true,
  params: {
    myParam: 'Hello from a parameter!',
    dictRemoveFile: 'lol',
    anotherParam: 43,
  },
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview">
      <div className="uploaded-files">
        <div className="dz-details">
          <div className="dz-file-description">
            <div className="dz-filename">
              <span data-dz-name="true" />
            </div>
            <div className="dz-remove dz-remove-icon" data-dz-remove>
              <img src={'./assets/icons/delete.png'} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

const Dropzone = props => {
  var eventHandlers = {
    addedfile: file => {
      console.log(file, 'file');
      switch (file.name) {
        case 'PowerPlants.csv': {
          props.handlePowerPlants(file);
          break;
        }
        case 'load_zones.csv': {
          props.handleLoadZones(file);
          break;
        }
        case 'BuildTrans.tab': {
          props.handleTransmissionLines(file);
          break;
        }

        default:
          break;
      }
    },
  };
  return (
    <div>
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}
      />
    </div>
  );
};

const DropzoneContainer = compose(
  graphql(
    gql`
      mutation uploadTL($file: FileInput) {
        uploadTransmissionLines(file: $file)
      }
    `,
    {
      name: 'uploadTL',
      options: {
        update: (proxy, { data: { uploadTransmissionLines } }) => {
          // const data = proxy.readQuery({ query });
          // console.log(data, uploadTransmissionLines);
          // data.files.push(uploadFile);          FIXME
          // proxy.writeQuery({ query, data });
        },
      },
    }
  ),
  graphql(
    gql`
      mutation uploadPP($file: FileInput) {
        uploadPowerPlants(file: $file)
      }
    `,
    {
      name: 'uploadPP',
      options: {
        update: (proxy, { data: { uploadPowerPlants } }) => {
          console.log(proxy, 'proxy 1');
          const data = proxy.readQuery({
            query: gql`
              query getPP {
                getPowerPlants
              }
            `,
          });
          console.log(data, uploadPowerPlants);
          // data.getPowerPlants.push(uploadPowerPlants);
          console.log(proxy, 'proxy');
          proxy.writeQuery({
            query: gql`
              query getPP {
                getPowerPlants
              }
            `,
            data,
          });
        },
      },
    }
  ),
  graphql(
    gql`
      mutation uploadLZ($file: FileInput) {
        uploadLoadZones(file: $file)
      }
    `,
    {
      name: 'uploadLZ',
      options: {
        update: (proxy, { data: { uploadLoadZones } }) => {
          // const data = proxy.readQuery({ query });
          // console.log(data, uploadLoadZones);
          // data.files.push(uploadFile);          FIXME
          // proxy.writeQuery({ query, data });
        },
      },
    }
  ),
  withHandlers({
    handleTransmissionLines: ({ uploadTL }) => file => {
      uploadTL({
        variables: { file },
        refetchQueries: [
          {
            query: gql`
              query fileQuery {
                getTransmissionLines
              }
            `,
          },
        ],
      });
    },
    handlePowerPlants: ({ uploadPP }) => file => {
      uploadPP({
        variables: { file },
        refetchQueries: [
          {
            query: gql`
              query getPP {
                getPowerPlants
              }
            `,
          },
        ],
      });
    },
    handleLoadZones: ({ uploadLZ }) => file => {
      uploadLZ({
        variables: { file },
        refetchQueries: [
          {
            query: gql`
              query fileQuery {
                getLoadZones
              }
            `,
          },
        ],
      });
    },
  })
)(Dropzone);

export default DropzoneContainer;
