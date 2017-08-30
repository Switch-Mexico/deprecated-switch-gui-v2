import { Roles } from 'meteor/nicolaslopezj:roles';
import me from './me';
import user from './user';
import files from './files';
import getPowerPlants from './getPowerPlants';
import getTransmissionLines from './getTransmissionLines';
import getLoadZones from './getLoadZones';

export default {
  files,
  getTransmissionLines,
  getLoadZones,
  getPowerPlants,
  me,
  @Roles.action('viewUser') user,
};
