import d3 from 'd3';

import country from '../data';
// -------------------------------------------functionts
function capitalize(str) {
  let splittedEnter = str.split('_');
  let capitalized;
  for (let i = 0; i < splittedEnter.length; i++) {
    capitalized = splittedEnter[i].charAt(0).toUpperCase();
    splittedEnter[i] = capitalized + splittedEnter[i].substr(1).toLowerCase();
  }
  return splittedEnter.join(' ');
}

export default function nationalData(data) {
  let newCountry = country();

  data = data.rows.filter(
    obj => obj.being_built != 'generic_project' && obj.being_built != 'optimization'
  );

  let newData = [];

  data.forEach(obj => {
    let newObj = Object.assign({}, obj);
    if (
      newObj.gen_tech == 'bioenergy_natural_gas' ||
      newObj.gen_tech == 'bioenergy_diesel' ||
      newObj.gen_tech == 'bioenergy_fuel_oil'
    ) {
            newObj.gen_tech = 'bioenergy'; // eslint-disable-line
      newData.push(newObj);
    } else {
      newData.push(newObj);
    }
  });

  data = newData.filter(
    obj =>
      obj.gen_tech == 'geothermal' ||
      obj.gen_tech == 'solar' ||
      obj.gen_tech == 'hydroelectric' ||
      obj.gen_tech == 'eolic' ||
      obj.gen_tech == 'termosolar' ||
      obj.gen_tech == 'solar' ||
      obj.gen_tech == 'bioenergy'
  );

  let loadZonesCapacity = d3.nest().key(d => d.load_zone).entries(data);

  let loadZonesObject = {};

  loadZonesCapacity.forEach(loadZone => {
    let id = loadZone.key.substring(0, 2);
    let name = capitalize(loadZone.key.substring(3));

    let dato = d3
      .nest()
      .key(d => d.gen_tech)
      .rollup(d => {
        let val = Number(d3.sum(d, g => g.capacity_mw));
        val = val.toFixed(2);
        return val;
      })
      .entries(loadZone.values);

    let totalCapacity = d3
      .nest()
      .key(d => 'total')                              // eslint-disable-line
      .rollup(d => {
        let val = Number(d3.sum(d, g => g.value));
        val = val.toFixed(2);
        return val;
      })
      .entries(dato);

    let total = Number(totalCapacity[0].value);
    total = total.toFixed(2);
    loadZonesObject[id] = {
      type: 'loadZone',
      properties: {
        ID: loadZone.key,
        name: name,
              capacity: { total: total, break_down: dato }, // eslint-disable-line
        index: id,
      },
    };
  });

  data = d3.nest().key(d => d.balancing_area).entries(data);

        data.forEach(b_a => {                             // eslint-disable-line
    let dato = d3
      .nest()
      .key(d => d.gen_tech)
      .rollup(d => {
        let val = Number(d3.sum(d, g => g.capacity_mw));
        val = val.toFixed(2);
        return val;
      })
      .entries(b_a.values);                         // eslint-disable-line

    let totalCapacity = d3
      .nest()
      .key(d => 'total')                            // eslint-disable-line
      .rollup(d => {
        let val = Number(d3.sum(d, g => g.value));
        val = val.toFixed(2);
        return val;
      })
      .entries(dato);

    let total = Number(totalCapacity[0].value);
    total = total.toFixed(2);

          for (var key in newCountry.balancingAreas) { // eslint-disable-line
            if (b_a.key == newCountry.balancingAreas[key].properties.ID) { // eslint-disable-line
        newCountry.balancingAreas[key].properties.index = key;
              newCountry.balancingAreas[key].properties.capacity = { total: total, break_down: dato }; // eslint-disable-line
      }
    }

    newCountry.loadZones = loadZonesObject;
  });

  let balancingAreas = newCountry.balancingAreas;

  let newBalancingAreas = {};

  for (let key in balancingAreas) {
    if (balancingAreas[key].properties.capacity) {
      newBalancingAreas[key] = balancingAreas[key];
    }
  }

  newCountry.balancingAreas = newBalancingAreas;

  return newCountry;
}
