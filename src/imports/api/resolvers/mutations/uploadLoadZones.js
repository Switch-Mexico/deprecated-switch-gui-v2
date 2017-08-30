import LoadZones from '../../collections/loadZones';
import fs from 'fs';
import d3 from 'd3';

export default function uploadLoadZones(root, { file }) {
  let data = fs.readFileSync(file.path, 'utf-8', (err, d) => {
    if (err) {
      alert(`An error ocurred reading the file :${err.message}`);
      return;
    }
    return d;
  });

  let filename = file.name;
  console.log(filename);
  filename = filename.slice(0, -4);

  LoadZones.remove({});
  data = d3.csvParse(data);
  let rows = [];

  data.forEach((row, i) => {
    rows.push(row);
  });
  let columns = data.columns;
  LoadZones.insert({ name: filename, rows: rows, columns: columns });

  return LoadZones.findOne();
}
