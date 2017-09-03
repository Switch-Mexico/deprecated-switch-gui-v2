import Users from '../../collections/users';
import Emissions from '../../collections/emissions';
import TransmissionLines from '../../collections/transmissionLines';
import fs from 'fs';
import d3 from 'd3';

export default function uploadFile(root, { file }) {
  let data = fs.readFileSync(file.path, 'utf-8', (err, d) => {
    if (err) {
      alert(`An error ocurred reading the file :${err.message}`);
      return;
    }

    // Change how to handle the file content
    return d;
  });

  switch (file.name) {
    case 'neeli.csv': {
      let filename = file.name;
      filename = filename.slice(0, -4);

      Emissions.remove({});
      data = d3.csvParse(data);
      let rows = [];
      data.forEach((row, i) => {
        rows.push(row);
      });
      let columns = data.columns;

      Emissions.insert({ name: filename, rows: rows, columns: columns });
      break;
    }
    case 'PowerPlants.csv': {
      let filename = file.name;
      filename = filename.slice(0, -4);

      data = d3.csvParse(data);
      let rows = [];
      data.forEach((row, i) => {
        rows.push(row);
      });
      let columns = data.columns;

      break;
    }
    case 'BuildTrans.tab': {
      let filename = file.name;
      filename = filename.slice(0, -4);
      TransmissionLines.remove({});
      data = d3.tsvParse(data);
      let rows = [];
      data.forEach((row, i) => {
        rows.push(row);
      });
      let columns = data.columns;

      TransmissionLines.insert({ name: filename, rows: rows, columns: columns });

      break;
    }

    case 'load_zones.tab':
      break;

    case 'project_info.tab':
      break;

    default:
      console.log('Not valid file');
  }
  return TransmissionLines.findOne();
}
