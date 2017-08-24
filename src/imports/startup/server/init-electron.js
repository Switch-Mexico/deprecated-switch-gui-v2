import { Meteor } from 'meteor/meteor';

export default function() {
  Meteor.startup(() => {
    console.log('Meteor app started.'); // eslint-disable-line
  });
}
