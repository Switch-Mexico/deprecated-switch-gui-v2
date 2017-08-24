const Avatar = `
  type Avatar {
    _id: ID!
    name: String!
    type: String!
    size: String!
    url: String!
  }
`;
export default () => [Avatar];
