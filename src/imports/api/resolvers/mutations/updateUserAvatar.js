import Users from '../../collections/users';
import Avatars from '../../collections/avatars';

export default function updateUserAvatar(root, { avatar }, context) {
  const avatarRef = Avatars.insertWithRemoteBuffer({
    avatar,
    userId: context.userId,
  });
  Users.update(
    { _id: context.userId },
    {
      $set: {
        avatarId: avatarRef._id,
      },
    }
  );
  return Users.findOne(context.userId);
}
