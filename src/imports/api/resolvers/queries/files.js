import PowerPlants from '../../collections/powerPlants';
import Emissions from '../../collections/emissions';
import TransmissionLines from '../../collections/transmissionLines';

export default function() {
  let powerPlants = PowerPlants.find().fetch();
  let emissions = Emissions.find().fetch();
  let transmissionLines = TransmissionLines.find().fetch();
  let files = [powerPlants, emissions, transmissionLines];

  return files;
}
