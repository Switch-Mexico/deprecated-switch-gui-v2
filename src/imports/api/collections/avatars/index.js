import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

const Avatars = new FilesCollection({
  collectionName: 'avatars',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
});

Avatars.insertWithRemoteBuffer = ({ avatar: { name: fileName, type, size, buffer }, userId }) => {
  const syncWriteAvatars = Meteor.wrapAsync(Avatars.write, Avatars);
  return syncWriteAvatars(buffer, {
    fileName,
    type,
    size,
    userId,
  });
};

export default Avatars;
