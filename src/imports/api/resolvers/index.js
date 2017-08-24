import Query from './queries';
import Mutation from './mutations';
import Date from './scalar-date';
import GraphQLJSON from 'graphql-type-json';
import Types from './types';

export default {
  ...Types,
  JSON: GraphQLJSON,
  Date,
  Query,
  Mutation,
};
