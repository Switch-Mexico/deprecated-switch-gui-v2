import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

let query = gql`
  {
    files
  }
`;

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
      props.handleFile(file);
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
      mutation($file: FileInput) {
        uploadFile(file: $file)
      }
    `,
    {
      options: {
        update: (proxy, { data: { uploadFile } }) => {
          const data = proxy.readQuery({ query });
          // data.files.push(uploadFile);          FIXME
          // proxy.writeQuery({ query, data });
        },
      },
    }
  ),
  withHandlers({
    handleFile: ({ mutate }) => file => {
      mutate({
        variables: { file },
        refetchQueries: [
          {
            query: gql`
              query fileQuery {
                files
              }
            `,
          },
        ],
      });
    },
  })
)(Dropzone);

export default DropzoneContainer;
