import { compose, withState, lifecycle } from 'recompose';
import '/imports/ui/styles/App/HomeContainer.scss';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import d3 from 'd3';

import L from 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';

import nationalData from '../../../data/nationalData';
import LoadZones from '../../../components/Dashboard/Inputs/LoadZones';

const Container = compose(
  graphql(gql`
    query fileQuery {
      getLoadZones
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

        // let data = res.data.getLoadZones[0]; // fixed
      });
    },
  })
)(LoadZones);

export default Container;
