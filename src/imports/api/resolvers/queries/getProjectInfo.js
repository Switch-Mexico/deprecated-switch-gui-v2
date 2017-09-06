import LoadZones from '../../collections/projectInfo';

export default function() {
  let file = LoadZones.find().fetch();
  return file;
}
