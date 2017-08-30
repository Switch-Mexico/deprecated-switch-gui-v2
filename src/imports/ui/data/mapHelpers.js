import L from 'leaflet/dist/leaflet.js';

// Function to set the bottom left legend listing the balancing areas names

export function setLegend(country) {
  let legend = L.control({ position: 'bottomleft' });

  legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    // loop through our balancing_areas and generate a label with a colored square for each balancing_area
    for (var key in country.balancingAreas) {
      div.innerHTML += `<i style="background:${country.balancingAreas[key].properties
        .color}"></i> ${country.balancingAreas[key].properties.name}<br>`;
    }
    return div;
  };

  return legend;
}

// Function to highlight the shapes of a echa polygon (loadZone) whe hover
export function highlightFeature(layer, lZ, map, country, key, a, mapInfo) {
  let id = lZ.ID;
  let name = country.loadZones[id] ? country.loadZones[id].properties.name : 'No Data';
  let total = country.loadZones[id] ? country.loadZones[id].properties.capacity.total : 'No Data';

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  let props = {
    l_z: { name: name, total: total },
    b_a: {
      name: country.balancingAreas[key].properties.name,
      total: country.balancingAreas[key].properties.capacity.total,
    },
  };

  mapInfo.update(props);
}

// Function to reset the highlight when hover a plygon
export function resetHighlight(layer, mapInfo) {
  layer.setStyle({
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  mapInfo.update();
}

// Function to zoom to polygon when polygon clicked
export function zoomToFeature(layer, map) {
  map.fitBounds(layer.getBounds());
}
// Function to handle a click over a polygon, it will update the labels
export function handleClick(data, self) {
  let arrayData = [];
  let name = data.properties.name;
  let type = data ? data.type : 'none'; // FIXME temporal approach to skip loadZones w/o data
  let d = data.properties.capacity.break_down;
  let color = data.properties ? data.properties.color : '#ffffff';

  d.map(a => {
    arrayData.push({ name: a.key, [name]: a.value });
    return a;
  });

  self.props.setColor(color);

  if (type == 'balancingArea') {
    self.props.setBalancingArea({ name: name, values: arrayData });
  } else if (type == 'loadZone') {
    self.props.setLoadZone({ name: name, values: arrayData });
  }
}

// Function to set the upper info, it will describe the current shape when hover
export function setInfo(props) {
  let info = L.control();

  info.onAdd = function() {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control operating over the feature properties received
  info.update = function(props) {
    this._div.innerHTML = `${props // ternary operator to decide wheter there are function's arguments or not
      ? `${'Balancing Area:     ' + '<b>'}${props.b_a.name}</b>` +
        `<br>` + // if arguments
        `Installed Capacity: ` +
        `<b>${props.b_a.total} [MW]` +
        `</b>` +
        `<br>` +
        `Load Zone:          ` +
        `<b>${props.l_z.name}</b>` +
        `<br>` +
        `Installed Capacity: ` +
        `<b>${props.l_z.total} [MW]` +
        `</b>`
      : 'Hover over a Load Zone'}`; // if no arguments
  };

  return info;
}

// Function to configure all of he features (such as higlight, onclick, resethighlight etc)

export function setGeoJSON(country, map, a, mapInfo) {
  let shapeLayers = {};
  let shapeNames = {
    Prodesen: '',
    Switch: '',
  };
  for (let shapeName in shapeNames) {
    // iterates over the shapes that a country has (in our case both the ones provided by prodesen and the ones generated with Mateo's work)

    let geojsonLayers = [];

    for (let key in country.balancingAreas) {
      // functon to iterate over the gejson files and attach them a click funcion per feature (polygon, point .. sh/ape)
      let keys = Object.keys(country.loadZones);

      let newShapes = [];
      let shapes = country.balancingAreas[key].properties.shape[shapeName].features;

      shapes.map(obj =>
        keys.map(k => {
          if (obj.properties.ID === k) {
            newShapes.push(obj);
          }
        })
      );
      country.balancingAreas[key].properties.shape[shapeName].features = newShapes;
      geojsonLayers.push(
        L.geoJson(country.balancingAreas[key].properties.shape[shapeName], {
          fillColor: country.balancingAreas[key].properties.color,
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
          b_a: country.balancingAreas[key],
          pane: 'shapes',
          onEachFeature: function(feature, layer) {
            layer.on('click', e => {
              let id = feature.properties.ID;
              zoomToFeature(layer, map);
              handleClick(country.loadZones[id], a);
            });

            layer.on('mouseover', e => {
              highlightFeature(layer, layer.feature.properties, map, country, key, a, mapInfo);
            });

            layer.on('mouseout', e => {
              resetHighlight(layer, mapInfo, a);
            });
          },
        })
      );

      geojsonLayers.forEach(layer => {
        let featureGroup = L.featureGroup([layer]);
        featureGroup.on('click', () => handleClick(layer.options.b_a, a));
      });
    }

    shapeLayers[shapeName] = L.layerGroup(geojsonLayers);
  }
  return shapeLayers;
}
