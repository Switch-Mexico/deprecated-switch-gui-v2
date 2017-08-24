import User from './types/user';

const Query = `
  type Query {
    me: User
    user(_id: ID!): User
    files: [JSON]
  }
`;
export default () => [Query, User];
