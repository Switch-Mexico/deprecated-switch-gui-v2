import { Accounts } from 'meteor/accounts-base';
import cloneDeep from 'lodash/cloneDeep';
import Users from '../../../api/collections/users';

Accounts.urls.resetPassword = token => `${process.env.UI_ENDPOINT}/reset-password?reset=${token}`;

Accounts.urls.verifyEmail = token => `${process.env.UI_ENDPOINT}/verify-email?verify=${token}`;

Accounts.validateNewUser(user => {
  const clone = cloneDeep(user);
  delete clone._id; // eslint-disable-line
  Users.simpleSchema().validate(clone);
  return true;
});

Accounts.onCreateUser((options, user = {}) => {
  const newUser = user;
  newUser.profile = null;
  if (newUser.services.google) {
    newUser.profile = {
      name: newUser.services.google.name,
      image: { url: newUser.services.google.picture, fileId: '1' },
    };
    newUser.emails = [{ address: newUser.services.google.email, verified: true }];
  }

  if (newUser.services.facebook) {
    newUser.profile = {
      name: newUser.services.facebook.name,
      image: {
        url: `https://graph.facebook.com/${newUser.services.facebook.id}/picture?type=large`,
        fileId: '1',
      },
    };
    newUser.emails = [{ address: newUser.services.facebook.email, verified: true }];
  }

  /* Meteor.defer(() => {
    Accounts.sendVerificationEmail(newUser._id);
  });*/
  return newUser;
});
