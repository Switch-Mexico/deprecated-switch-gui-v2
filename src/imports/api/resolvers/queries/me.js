import Users from '../../collections/users';

export default function(root, params, context) {
  console.log(context);
  return Users.findOne(context.userId);
}
