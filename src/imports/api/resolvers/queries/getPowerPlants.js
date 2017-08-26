import PowerPlants from '../../collections/powerPlants';

export default function() {
  let file = PowerPlants.find().fetch();
  return file;
}
