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
  data = d3.tsvParse(data);
  let rows = [];

  data.forEach((row, i) => {
    let id = row.proj_load_zone.substring(0,2);
    let r = {'id':id, 'name': row.PROJECT, 'capacity_limit': row.proj_capacity_limit_mw, 'load_zone':row.proj_load_zone, 'o_m':row.proj_variable_o_m}
    rows.push(r);
  });

  data = d3
  .nest()
  .key(d => d.id)
  .rollup(d => d)
  .entries(rows);     


  ProjectInfo.insert({ name: filename, data: data });

  return ProjectInfo.findOne();
}
