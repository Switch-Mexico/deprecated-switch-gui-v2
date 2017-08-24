import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { createBatchingNetworkInterface } from 'apollo-upload-client';

const batchingNetworkInterface = createBatchingNetworkInterface({
  uri: '/graphql',
});

batchingNetworkInterface.use([
  {
    applyBatchMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }
      let token = window.localStorage.getItem('Meteor.loginToken');
      req.options.headers['meteor-login-token'] = token || null;
      next();
    },
  },
]);

// const client = new ApolloClient(
//   meteorClientConfig({
//     reduxRootSelector: state => state.get('apollo'),
//     networkInterface: batchingNetworkInterface,
//     dataIdFromObject: o => o.id
//   })
// );
// export default client;

const client = new ApolloClient(
  meteorClientConfig({
    reduxRootSelector: state => state.get('apollo'),
    networkInterface: batchingNetworkInterface,
    dataIdFromObject: result => {
      if (result._id && result.__typename) {
        return result.__typename + result._id;
      }
      return null;
    },
  })
);

export default client;
