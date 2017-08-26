import { Roles } from 'meteor/nicolaslopezj:roles';
import me from './me';
import user from './user';
import files from './files';
import getPowerPlants from './getPowerPlants';
import getTransmissionLines from './getTransmissionLines';

export default {
  files,
  getTransmissionLines,
  getPowerPlants,
  me,
  @Roles.action('viewUser') user,
};
