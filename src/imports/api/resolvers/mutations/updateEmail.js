import { Accounts } from 'meteor/accounts-base';
import Users from '../../collections/users';

export default function(root, { email }, context) {
  Users.update(context.userId, {
    $set: {
      'emails.0.address': email,
      'emails.0.verified': false,
    },
  });
  Accounts.sendVerificationEmail(context.userId);
  return Users.findOne(context.userId);
}
