import Users from '../../collections/users';

export default function(root, { _id }) {
  return Users.findOne(_id);
}
