import Users from '../../collections/users';

export default function(root, { profile, userId }, context) {
  const normalizedUserId = userId || context.userId;
  Users.update(normalizedUserId, {
    $set: {
      profile,
    },
  });

  Users.setStepCompleted({ userId: normalizedUserId, step: 'PROFILE' });
  return Users.findOne(normalizedUserId);
}
