import ProjectInfo from '../../collections/projectInfo';
import fs from 'fs';
import d3 from 'd3';

function humanize(str) {
  var frags = str.split('_');
  for (let i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

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
    let name = humanize(row.PROJECT)
    if (name.length > 20){
      name = humanize(row.PROJECT).substring(0,20).concat('...');
   }
    let load_zone = humanize(row.proj_load_zone.substring(3));
    let id = row.proj_load_zone.substring(0,2);
    let r = {'id':id, 'name': name, 'Capacity Limit': Number(row.proj_capacity_limit_mw), 'load_zone':load_zone, 'o_m':Number(row.proj_variable_o_m)}
    rows.push(r);
  });

  data = d3
  .nest()
  .key(d => d.id)
  .rollup(d => d)
  .entries(rows); 
  
  data.forEach((row, i) => {
    let total = Number(d3.sum(row.value, g => g['Capacity Limit'])).toFixed(3);
    row.total_capacity_limit = total;
  });

  ProjectInfo.insert({ name: filename, data: data });

  return ProjectInfo.findOne();
}
