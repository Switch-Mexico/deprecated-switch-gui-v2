import { compose, withState, lifecycle } from 'recompose';
import '/imports/ui/styles/App/HomeContainer.scss';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import L from 'leaflet/dist/leaflet.js';

import 'leaflet/dist/leaflet.css';

import Map from '../../../../../components/Dashboard/Inputs/Capacity/Map';
import getCountry from '../../../../../data';
import { addDataToMap, handleClick } from './mapHelpers';

let randomProperty = function(obj, keys = Object.keys(obj)) {
  return obj[keys[(keys.length * Math.random()) << 0]];
};

const Container = compose(
  graphql(gql`
    query fileQuery {
      getPowerPlants
    }
  `),
  withState('layers', 'setLayers', 0),
  withState('legend', 'setLegend', 0),
  withState('map', 'setMap', 0),
  lifecycle({
    componentWillReceiveProps(prevProps) {
      if (
        prevProps.data.getPowerPlants &&
        this.props.data.getPowerPlants &&
        prevProps.data.getPowerPlants[0] &&
        prevProps.data.getPowerPlants[0] != this.props.data.getPowerPlants[0]
      ) {
        this.props.data.refetch().then(res => {
          if (res.data.getPowerPlants[0]) {
            let data = res.data.getPowerPlants[0].country;
            this.props.map.remove();
            addDataToMap(data, this);
            // Code to generate chart views on startup (needs to be simplified)
            let balancingAreas = data.balancingAreas;
            let loadZones = data.loadZones;

            let randomBalancingArea = randomProperty(balancingAreas);
            let index = randomBalancingArea.properties.index;
            let country = getCountry();
            let lz = country.balancingAreas[index].properties.shape.Prodesen.features;
            let randomLoadZone = 0;
            lz.forEach(element => {
              if (element.properties.ID in loadZones) {
                randomLoadZone = loadZones[element.properties.ID];
              }
            }, this);

            console.log(randomLoadZone);
            handleClick(randomLoadZone, this);
            handleClick(randomBalancingArea, this);
            // End of code to generate chart views on startup
          }
        });
      }
    },
    componentDidMount() {
      let map = L.map(this.refs.national_map, { zoomControl: false, minZoom: 4 });
      map.setView([23.8, -102.1], 5);
      map.createPane('shapes');
      map.getPane('shapes').style.zIndex = 900;
      map.createPane('labels');
      map.getPane('labels').style.zIndex = 901;
      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
      }).addTo(map);
      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels',
      }).addTo(map);

      this.props.setMap(map);

      this.props.data.refetch().then(res => {
        if (res.data.getPowerPlants[0]) {
          let data = res.data.getPowerPlants[0].country;
          this.props.map.remove();
          addDataToMap(data, this);

          // Code to generate chart view on startup (needs to be simplified)
          let balancingAreas = data.balancingAreas;
          let loadZones = data.loadZones;

          let randomBalancingArea = randomProperty(balancingAreas);
          let index = randomBalancingArea.properties.index;
          let country = getCountry();
          let lz = country.balancingAreas[index].properties.shape.Prodesen.features;
          let randomLoadZone = 0;
          lz.forEach(element => {
            if (element.properties.ID in loadZones) {
              randomLoadZone = loadZones[element.properties.ID];
            }
          }, this);

          console.log(randomLoadZone);
          handleClick(randomLoadZone, this);
          handleClick(randomBalancingArea, this);
          // End of code to generate chart views on startup
        }
      });
    },
  })
)(Map);

export default Container;
