import { compose, withState, lifecycle } from 'recompose';
import '/imports/ui/styles/App/HomeContainer.scss';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import L from 'leaflet/dist/leaflet.js';

import 'leaflet/dist/leaflet.css';

import Map from '../../../../../components/Dashboard/Inputs/ProjectInfo/Map';
import getCountry from '../../../../../data';
import { showCircles } from './mapHelpers';


const Container = compose(
  graphql(gql`
    query fileQuery {
      getPowerPlants
    }
  `),
  withState('layers', 'setLayers', 0),
  withState('map', 'setMap', 0),
  lifecycle({
    componentWillReceiveProps(prevProps) {
      
    },
    componentDidMount() {
      let map = L.map(this.refs.project_info_map, { zoomControl: false, minZoom: 4 });
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
      showCircles(map);

    },
  })
)(Map);

export default Container;
