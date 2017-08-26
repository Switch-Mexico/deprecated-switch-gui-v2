import Emissions from '../../collections/emissions';

export default function() {
  let emissions = Emissions.find().fetch();
  let files = [emissions];

  return files;
}
