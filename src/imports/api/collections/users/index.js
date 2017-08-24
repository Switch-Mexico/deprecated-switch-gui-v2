import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

Meteor.users.attachSchema(
  new SimpleSchema(
    {
      username: String,
      emails: Array,
      'emails.$': Object,
      'emails.$.address': String,
      'emails.$.verified': Boolean,
      createdAt: Date,
      profile: new SimpleSchema(
        {
          firstName: String,
          lastName: String,
          street: String,
          city: String,
          postalNumber: Number,
          birthday: Date,
          phoneMobile: String,
          hometown: String,
          regionalOffice: String,
        },
        { requiredByDefault: false }
      ),
      bank: new SimpleSchema(
        {
          name: String,
          internationalAccountNumber: String,
        },
        { requiredByDefault: false }
      ),
      insurance: new SimpleSchema(
        {
          healthInsuranceName: String,
          healthInsuranceNumber: Number,
          socialSecurityNumber: String,
        },
        { requiredByDefault: false }
      ),
      skills: new SimpleSchema(
        {
          drivingLicence: String,
          workExperience: String,
        },
        { requiredByDefault: false }
      ),
      other: new SimpleSchema(
        {
          healthInsuranceName: String,
          healthInsuranceNumber: Number,
          socialSecurityNumber: String,
        },
        { requiredByDefault: false }
      ),
      avatarId: String,
      stepsCompleted: Array,
      'stepsCompleted.$': Object,
      'stepsCompleted.$.timestamp': Date,
      'stepsCompleted.$.step': String,
      services: {
        type: Object,
        optional: true,
        blackbox: true,
      },
      roles: Array,
      'roles.$': String,
    },
    { requiredByDefault: false }
  )
);

Meteor.users.setStepCompleted = ({ userId, step }) =>
  Meteor.users.update(
    {
      _id: userId,
      'stepsCompleted.step': { $ne: step },
    },
    {
      $addToSet: {
        stepsCompleted: {
          timestamp: new Date(),
          step,
        },
      },
    }
  );

export default Meteor.users;
