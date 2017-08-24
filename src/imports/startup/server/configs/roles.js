import { Roles } from 'meteor/nicolaslopezj:roles';

Roles.loggedInRole.allow('viewUser', function viewUser(root, { _id }) {
  return this.userId === _id;
});

Roles.adminRole.allow('viewUser', () => true);
