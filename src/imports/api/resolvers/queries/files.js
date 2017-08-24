import PowerPlants from '../../collections/powerPlants';
import Emissions from '../../collections/emissions';

export default function() {
  console.log('exec');
  let powerPlants = PowerPlants.find().fetch();
  let emissions = Emissions.find().fetch();
  let files = [powerPlants, emissions];
  console.log(files);

  return files;
}
