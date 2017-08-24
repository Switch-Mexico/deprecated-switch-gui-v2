import { Roles } from 'meteor/nicolaslopezj:roles';
import me from './me';
import user from './user';
import files from './files';

export default {
  files,
  me,
  @Roles.action('viewUser') user,
};
