import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { apolloUploadExpress } from './apollo-upload-server';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeDefs from '/imports/api/schema';
import resolvers from '/imports/api/resolvers';

// Load all accounts related resolvers and type definitions into graphql-loader
initAccounts({ loginWithPassword: true });
// Gets all the resolvers and type definitions
const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer(
  { schema },
  {
    configServer(graphQLServer) {
      // add apolloUploadExpress middlewares before graphQL picks up the request to handle files
      graphQLServer.use(cors());
      graphQLServer.use(bodyParser.json(), apolloUploadExpress({}));
    },
  }
);
