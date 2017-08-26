import { compose, withState, lifecycle } from 'recompose';
import '/imports/ui/styles/App/HomeContainer.scss';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import d3 from 'd3';

import L from 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';

import nationalData from '../../../data/nationalData';
import Capacity from '../../../components/Dashboard/Inputs/Capacity';

import { setInfo, setLegend, setGeoJSON } from '../../../data/mapHelpers';

const QueryContainer = compose(
  graphql(gql`
    query fileQuery {
      getPowerPlants
    }
  `),
  withState('map', 'setMap', 0),
  withState('country', 'setCountry', 0),
  withState('mapInfo', 'setMapInfo', 0),
  withState('global', 'setGlobal', []),
  withState('loadZone', 'setLoadZone', []),
  withState('color', 'setColor', '#343434'),
  withState('balancingArea', 'setBalancingArea', []),
  lifecycle({
    componentWillMount() {
      this.props.data.refetch();
    },
    componentDidMount() {
      let self = this; // save de reference to the component context
      this.props.data.refetch().then(res => {
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

        let data = res.data.getPowerPlants[0]; // fixed

        let arrayData = [];
        let country = nationalData(data);

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
        // hasta aqui
        self.props.setGlobal({ name: 'global', values: arrayData });
        self.props.setMap(map);
        self.props.setCountry(country);
        let mapInfo = setInfo();
        let shapeLayers = setGeoJSON(country, map, self, mapInfo);
        self.props.setMapInfo(mapInfo);
        mapInfo.addTo(map);
        let mapLegend = setLegend(country);
        mapLegend.addTo(map);

        L.control.layers(shapeLayers).addTo(map);

        L.control
          .zoom({
            position: 'topright',
          })
          .addTo(map);
      });
    },
  })
)(Capacity);

export default QueryContainer;
