import Avatar from './avatar';

const User = `
  type UserProfile {
    firstName: String!
    lastName: String!
    street: String!
    postalNumber: Int!
    city: String!
    birthday: Date!
    phoneMobile: String
    hometown: String
  }

  type UserEmail {
    address: String!
    verified: Boolean!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    isEmailVerified: Boolean!
    name: String!
    avatar: Avatar
    profile: UserProfile
    emails: [UserEmail]
    roles: [ID]
    internalComment: String
  }
`;
export default () => [User, Avatar];
