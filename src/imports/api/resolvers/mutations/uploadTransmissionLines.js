import TransmissionLines from '../../collections/transmissionLines';
import fs from 'fs';
import d3 from 'd3';

export default function uploadTransmissionLines(root, { file }) {
  let data = fs.readFileSync(file.path, 'utf-8', (err, d) => {
    if (err) {
      alert(`An error ocurred reading the file :${err.message}`);
      return;
    }
    return d;
  });

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

  return TransmissionLines.findOne();
}
