import d3 from 'd3';
import L from 'leaflet/dist/leaflet.js';

export function capitalize(str) {
  let splittedEnter = str.split(' ');
  let capitalized;
  for (var i = 0; i < splittedEnter.length; i++) {
    capitalized = splittedEnter[i].charAt(0).toUpperCase();
    splittedEnter[i] = capitalized + splittedEnter[i].substr(1).toLowerCase();
  }
  return splittedEnter.join(' ');
}
export function getYears(data) {
  // get all the years and legacy periods from droped file (BuildTrans)
  var m = d3.map(data, d => d.TRANS_BUILD_YEARS_2);
  var years = m.keys();
  return years;
}

export function getWeight(mw) {
  // set the weight of the transmission line
  return mw > 4000
    ? 8
    : mw > 2000 ? 7 : mw > 1000 ? 6 : mw > 500 ? 5 : mw > 100 ? 4 : mw > 0 ? 3 : 1;
}

export function clearMap(layer) {
  // this function clean the map to show new data
  for (let i in this.state.maps._layers) {
    // get all the map layers
    if (
      this.state.maps._layers[i]._path != undefined &&
      this.state.maps._layers[i].options.pane == layer
    ) {
      try {
        this.state.maps.removeLayer(this.state.maps._layers[i]); // delete a layer
      } catch (e) {
        console.log(`problem with ${e}${this.state.maps._layers[i]}`); // if error then
      }
    }
  }
}

export function leftZero(n) {
  var s = String(n);
  while (s.length < 2) {
    s = `0${s}`;
  }
  return s;
}

export function getPeriod(data) {
  // get all the years and legacy periods from droped  file

  var m = d3.map(data, d => d.TRANS_BUILD_YEARS_2);
  var years = m.keys();

  return years;
}

export function setInfo() {
  let info = L.control();

  info.onAdd = function() {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function(props) {
    this._div.innerHTML = `<h6>Hover over a transmission line</h6>${props
      ? `<b> From ${props.from} to ${props.to}</b><br />` + `Capacity: ${props.capacity}  [MW]`
      : ''}`;
  };

  return info;
}

export function setLegend() {
  // legend that displays the information related to red and blue transmissionlines

  let legend = L.control({ position: 'bottomleft' });
  let color = ['#0067c8', '#ff4949'];
  let transmissionLines = ['Legacy transmission lines', "Switch's transmission lines"];

  legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    // loop through our transmission_lines and generate a label with a colored square for each transmission_line
    transmissionLines.forEach((tL, i) => {
      div.innerHTML += `<i style="background:${color[i]}"></i> ${tL}<br>`;
    });

    return div;
  };

  return legend;
}

export function highlightFeature(self, layer, props) {
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 1,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  self.update(props);
}

export function resetHighlight(self, layer, weight, pane, color) {
  layer.setStyle({
    color: color,
    weight: weight,
    pane: pane,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  self.update();
}

export function zoomToFeature(layer, map) {
  map.fitBounds(layer.getBounds());
}

export function showMap(self, mapa) {
  // /draw the new transmission lines
  let nodex = [];

  let b = [];

  d3.csv('/data/transmission_lines.csv', (error, data) => {
    // get the current transmission lines from file
    data = data.filter(row => row);

    data.map(row => {
      let lz1 = row.lz1.substring(0, 2); // get the id of transmission line from row in file (first two digits)
      let lz2 = row.lz2.substring(0, 2);
      let lz1Name = capitalize(row.lz1.substring(3)); // get the id of transmission line's name from row in file
      let lz2Name = capitalize(row.lz2.substring(3));

      let weight = getWeight(row.existing_trans_cap_mw); // call funct to get weight
      nodex = [self.props.country.loadZones[lz1], self.props.country.loadZones[lz2]]; // get the coordinates of the oadzones by id

      let info = { from: lz1Name, to: lz2Name, capacity: row.existing_trans_cap_mw };

      let polyline = L.polyline(nodex, {
        color: '#0067c8',
        weight: weight,
        pane: 'blue',
      });

      polyline.on('click', e => {
        zoomToFeature(e.target, mapa);
      });

      polyline.on('mouseover', e => {
        highlightFeature(self.props.mapInfo, e.target, info);
      });

      polyline.on('mouseout', e => {
        resetHighlight(self.props.mapInfo, e.target, weight, 'blue', '#0067c8');
      });

      b.push(polyline); // draw a line from point A to point B
    });

    b = L.layerGroup(b);
    self.props.setBlueLines(b);
  });
}

export function drawPoints(self, country, mapa) {
  let coordinatesList = {};

  for (let key in country.balancingAreas) {
    // functon to iterate over the gejson files and attach them a click funcion per feature (polygon, point .. sh/ape)
    L.geoJson(country.balancingAreas[key].properties.shape.Prodesen, {
      onEachFeature: function(feature, layer) {
        let id = leftZero(feature.properties.ID);
        let coordinates = layer.getBounds().getCenter();
        coordinatesList[id] = coordinates;

        L.circle([coordinates.lat, coordinates.lng], {
          color: '#0067c8', // set the points color opacity and radius
          fillColor: '#0067c8',
          fillOpacity: 0.3,
          opacity: 0.3,
          radius: 25000,
          pane: 'blue',
        }).addTo(mapa);
      },
    });
  }

  country.loadZones = coordinatesList;
  self.props.setCountry(country);
}

export function showNewPoints(self, country, mapa, data, period, blueLines) {
  let overlayMaps = {};

  period.forEach(year => {
    let lines = [];

    data.map(row => {
      if (row.TRANS_BUILD_YEARS_2 == year) {
        let nodex = [];

        let lzs = row.TRANS_BUILD_YEARS_1.split('-'); // get the names of the transmission lines
        let lz1 = lzs[0]; // set transmission line one and two
        let lz2 = lzs[2];

        let lz1Name = capitalize(lzs[1].substring(3)); // get the id of transmission line's name from row in file
        let lz2Name = capitalize(lzs[3].substring(3));

        let weight = getWeight(row.BuildTrans); // get the underlying weight
        nodex = [country.loadZones[lz1], country.loadZones[lz2]]; // set corrdinates obteined from coordinates.json file
        let info = { from: lz1Name, to: lz2Name, capacity: row.existing_trans_cap_mw };

        let polyline = L.polyline(nodex, { color: '#ff4949', weight: weight, pane: 'red' }); // draw the poyline
        polyline.on('click', e => {
          zoomToFeature(e.target, mapa);
        });

        polyline.on('mouseover', e => {
          highlightFeature(self.mapInfo, e.target, info);
        });

        polyline.on('mouseout', e => {
          resetHighlight(self.mapInfo, e.target, weight, 'red', '#ff4949');
        });

        lines.push(polyline);
      }
    });

    lines = L.layerGroup(lines);

    overlayMaps[year] = lines;
  });

  overlayMaps['Current T. L.'] = blueLines;
  L.control.layers({}, overlayMaps).addTo(mapa);
}
