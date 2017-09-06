import ProjectInfo from '../../collections/projectInfo';
import fs from 'fs';
import d3 from 'd3';

export default function uploadProjectInfo(root, { file }) {
  let data = fs.readFileSync(file.path, 'utf-8', (err, d) => {
    if (err) {
      alert(`An error ocurred reading the file :${err.message}`);
      return;
    }
    return d;
  });

  let filename = file.name;
  filename = filename.slice(0, -4);

  ProjectInfo.remove({});
  data = d3.csvParse(data);
  let rows = [];

  data.forEach((row, i) => {
    rows.push(row);
  });
  let columns = data.columns;
  ProjectInfo.insert({ name: filename, rows: rows, columns: columns });

  return ProjectInfo.findOne();
}
