import PowerPlants from '../../collections/powerPlants';
import fs from 'fs';
import d3 from 'd3';

import nationalData from '../../../ui/data/nationalData';

export default function uploadPowerPlants(root, { file }) {
  let data = fs.readFileSync(file.path, 'utf-8', (err, d) => {
    if (err) {
      alert(`An error ocurred reading the file :${err.message}`);
      return;
    }
    return d;
  });

  let filename = file.name;
  filename = filename.slice(0, -4);

  PowerPlants.remove({});
  data = d3.csvParse(data);
  let rows = [];
  let a = 0;
  data.forEach((row, i) => {
    rows.push(row);
    a += 1;
  });
  let columns = data.columns;

  let allData = { name: filename, rows: rows, columns: columns };

  let arrayData = [];
  let country = nationalData(allData);

  Object.entries(country.balancingAreas).forEach(([key, value]) => {
    let capacities = value.properties.capacity.break_down;
    capacities.map(a => {
      arrayData.push({ tech: a.key, name: value.properties.name, value: a.value });
      return a;
    });
  });

  var entries = d3.nest().key(d => d.tech).entries(arrayData);
  arrayData = [];
  Object.entries(entries).forEach(([key, value]) => {
    let obj = {};
    let e = value.values;
    e.map(a => {
      obj.name = a.tech;
      obj[a.name] = a.value;
      return a;
    });

    arrayData.push(obj);
  });

  let _id = PowerPlants.insert({
    country: country,
    chartData: { name: 'global', values: arrayData },
  });

  return PowerPlants.find({ _id }).fetch();
}
