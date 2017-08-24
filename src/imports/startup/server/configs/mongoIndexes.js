import { Meteor } from 'meteor/meteor';
import Users from '/imports/api/collections/users';

Meteor.startup(() => {
  Users._ensureIndex({
    username: 1,
  });
});
