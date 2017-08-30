import User from './types/user';

const Query = `
  type Query {
    me: User
    user(_id: ID!): User
    files: [JSON]
    getPowerPlants: [JSON]
    getTransmissionLines: [JSON]
    getLoadZones: [JSON]
  }
`;
export default () => [Query, User];
