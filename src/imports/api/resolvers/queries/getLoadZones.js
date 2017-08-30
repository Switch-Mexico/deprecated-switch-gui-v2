import LoadZones from '../../collections/loadZones';

export default function() {
  let file = LoadZones.find().fetch();
  return file;
}
