import Avatars from '../../collections/avatars';

export default {
  email(user) {
    return user.emails[0].address;
  },
  isEmailVerified(user) {
    return user.emails[0].verified;
  },
  name({ username, profile }) {
    const nameParts = [];
    if (profile && profile.firstName) nameParts.push(profile.firstName);
    if (profile && profile.lastName) nameParts.push(profile.lastName);
    if (nameParts.length === 0) {
      return `ZDP-${username}`;
    }
    return nameParts.join(' ');
  },
  avatar(user) {
    return Avatars.findOne({ _id: user.avatarId });
  },
};
